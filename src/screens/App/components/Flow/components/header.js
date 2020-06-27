/** @jsx jsx */
import { 
  Component 
} from 'react'
import { jsx } from '@emotion/core'
import { Button, Dropdown } from 'semantic-ui-react'
import images from '../../../../../images'
import YAMLGen from '../yamlGen'
// import YAML from 'json-to-pretty-yaml'

const YAML = require('json-to-pretty-yaml');

class Header extends Component {

  downloadFile(fileContent, filename) {
    var data = new Blob([fileContent], {type: 'text/yaml'});
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', filename + '.yaml');
    tempLink.click();
  }

  createKubeObject(node, manifestInfo) {
    node.properties.kind = node.type.replace(/ /g,'')
    node.properties.apiVersion = manifestInfo.apiVersion
    node.properties.metadata.namespace = manifestInfo.namespace
    var labels = {}
    if ('labels' in node.properties.metadata) {
      for (var l of node.properties.metadata.labels) {
        labels[l['name']] = l['value']
      }
      node.properties.metadata.labels = labels
    }

    if (node.type === 'Persistent Volume Claim') {
      if ('accessModes' in node.properties.spec) {
        var accesModes = []
        for (var key in node.properties.spec.accessModes) {
          if (node.properties.spec.accessModes[key]) {
            accesModes.push(key)
          }
        }
        node.properties.spec.accessModes = accesModes
      }
    }

    return node.properties
  }

  sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
  }

  getTemplateFromContainers(containers, container_keys, graph, flowJson) {
    var template = {}

    for(var container of containers) {
      if ('metadata' in container && 'labels' in container.metadata) {
        if (!('metadata' in template)) {
          template.metadata = {}
          template.metadata.labels = {}
        }
        for(var label of container.metadata.labels) {
          template.metadata.labels[label.name] = label.value
        }
      }
    }

    template.spec = {}
    template.spec.containers = []
    for(var container of containers) {
      var temp_container = {}
      if ('metadata' in container ) {
        temp_container.name = container.metadata.name
      }

      for (var key in container) {
        if (key === 'metadata') continue
        temp_container[key] = container[key]
      }
      template.spec.containers.push(temp_container)
    }

    var c = 0
    for (var key of container_keys) {
      for (var neighbour of graph.AdjList[key]) {
        if (flowJson.nodes[neighbour].type === 'Persistent Volume Claim') {
          if ('volumeMounts' in template.spec.containers[c]) {
            if (!('volumes' in template.spec)) {
              template.spec.volumes = []
            }
            for (var vol of template.spec.containers[c].volumeMounts)
              template.spec.volumes.push({name: vol.name, persistentVolumeClaim: {claimName: flowJson.nodes[neighbour].properties.metadata.name}})
          }
        }
      }
      c += 1
    }

    return template
  }


  prepareYAMLFile(flowJson, manifestInfo) {
    var ygen = new YAMLGen()
    var graph = ygen.createGraphFromJson(flowJson)
    var sorted = graph.topologicalSort()
    var fileContent = ""
    for (var v of sorted) {
      
      if (flowJson.nodes[v].type === 'Container') {
        continue
      }
      
      var kubeObj = this.createKubeObject(flowJson.nodes[v], manifestInfo)

      var containers = []
      var container_keys = []
      if (flowJson.nodes[v].type === 'Deployment') {
        for (var container of graph.AdjList[v]) {
          containers.push(flowJson.nodes[container].properties)
          container_keys.push(container)
        }
        kubeObj.spec.template = this.getTemplateFromContainers(containers, container_keys, graph, flowJson)
      }  

      var yamlObj = YAML.stringify(this.sortObject(kubeObj))  
      fileContent += yamlObj.replace(/\"/g, "") + "\n" + "---" + "\n"
    }

    this.downloadFile(fileContent, manifestInfo.name)
  }

  render() {

    const profileOptions = [
      {
        key: 'user',
        text: (
          <span>
            Signed in as <strong>chiragw15</strong>
          </span>
        ),
        disabled: true,
      },
      { key: 'Sign Out', text: 'Sign Out', value: 'Sign Out' },
    ]
    
    return (
      <div style={styles.root} className={"header-column"}>
        
        <div style={styles.col1}>
          <img alt='logo' style={styles.img} src={images.LOGO} />
        </div>
        <div style={styles.col2}>
          <Button onClick={() => {
            this.prepareYAMLFile(this.props.flowJson, this.props.manifestInfo)
          }} primary content='Download Manifest' icon='download' labelPosition='left'>
          </Button>
        </div>

        <div style={styles.col3}>
          <span style={styles.trigger}>
            <img alt="user" src={images.USER} style={styles.userIcon}/> Hi, Chirag
          </span>
          <Dropdown 
            pointing='top right'
            selectOnBlur={false} 
            options={profileOptions}
            value={""}
            onChange={(event, data) => {
              if (data.value === 'Sign Out') {
                this.signout()
              }
            }}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    minHeight: 70,
    maxHeight: 70,
    alignItems: 'right',
    justifyContent: 'flex-end',
    backgroundColor: 'rgb(245, 247, 250)',
    borderBottom: '1px solid rgb(237, 239, 241)',
  },
  button: {
    // height: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    borderRadius: 15
  },
  download: {
    marginLeft: 18
  },
  trigger: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  col1: {
    flexGrow: 1
  },
  col2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 40
  },
  col3: {
    display: 'flex',
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  userIcon: {
    width: 40,
    height: 40,
    marginRight: 5
  },
  titleParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: '300',
    display: 'flex',
  },
  icon: {
    marginLeft: 10,
    width: 20,
    height: 20,
    color: 'rgb(75, 75, 75)',
  },
  breadCrumbParent: {
    marginLeft: 10,
  },
  breadCrumb: {
    cursor: 'pointer',
    fontSize: 20,
    fontWeight: '300',
    color: 'black',
  },
  flowControlsParent: {
    display: 'flex',
    flexDirection: 'row',
  },
  envSelectorParent: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgb(230, 232, 236)',
    borderRadius: 4,
  },
  environmentText: {
    color: 'grey'
  },
  img: {
    width: 208,
    height: 45,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10
  },
}

export default Header
