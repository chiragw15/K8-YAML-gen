/** @jsx jsx */
import { Component } from 'react'
import { jsx } from '@emotion/core'
import { Input, Dropdown, Form } from 'semantic-ui-react'
import { MdAddCircleOutline } from "react-icons/md"

class ServiceView extends Component {

  render() {
    const node = this.props.node
    const serviceOptions = [
      {'key': 'a', 'value': 'Load Balancer', 'text': 'Load Balancer'},
      {'key': 'b', 'value': 'Node Port', 'text': 'Node Port'},
      {'key': 'c', 'value': 'Cluster IP', 'text': 'Cluster IP'},
      {'key': 'd', 'value': 'External IP', 'text': 'External IP'}
    ]
    const protocolOptions = [
      {'key': 'e', 'value': 'TCP', 'text': 'TCP'},
      {'key': 'f', 'value': 'UDP', 'text': 'UDP'}
    ]

    return (
      <div>
        <div style={styles.strategyParent}>
          <div style={styles.labelParent}>
            <span style={styles.label}>Service Type</span>
          </div>
          
          <Dropdown 
            style={styles.dropDown} 
            placeholder='Service Type' 
            fluid 
            selection 
            options={serviceOptions} 
            value={node.properties && node.properties.spec ? node.properties.spec.type : ''}
            onChange={(evt,data) => {
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.spec) {
                node.properties.spec = {}
              }
              node.properties.spec.type = data.value
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />

        </div>
        
        <div style={styles.labelContainer}>
          <div style={styles.labelParent3}>
            <span style={styles.label}>Service Ports</span>
          </div>

          <MdAddCircleOutline 
            style={styles.addButton} 
            size="16" 
            color="rgb(100, 100, 100)" 
            onClick={() => { 
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.spec) {
                node.properties.spec = {}
              }
              if (!node.properties.spec.ports) {
                node.properties.spec.ports = []
              }
              node.properties.spec.ports.push({'port': '', 'targetPort': '', 'name': '', 'protocol': ''})
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />
        </div>

        <Form>
          {
          (node.properties && node.properties.spec && node.properties.spec.ports) ? node.properties.spec.ports.map( (port, index) => 
            <div key={index}> 
              <Form.Group widths='equal'>
                <Form.Input 
                  fluid 
                  label='Port' 
                  placeholder='80' 
                  value={port['port'] ? port['port'] : ''}
                  onChange={evt => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.spec) {
                      node.properties.spec = {}
                    }
                    if (!node.properties.spec.ports) {
                      node.properties.spec.ports = []
                    }
                    node.properties.spec.ports[index]['port'] = evt.target.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
                <Form.Input 
                  fluid 
                  label='Target Port' 
                  placeholder='80' 
                  value={port.targetPort ? port.targetPort : ''}
                  onChange={evt => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.spec) {
                      node.properties.spec = {}
                    }
                    if (!node.properties.spec.ports) {
                      node.properties.spec.ports = []
                    }
                    node.properties.spec.ports[index].targetPort = evt.target.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Input 
                  fluid 
                  label='Name' 
                  placeholder='Name' 
                  value={port.name ? port.name : ''}
                  onChange={evt => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.spec) {
                      node.properties.spec = {}
                    }
                    if (!node.properties.spec.ports) {
                      node.properties.spec.ports = []
                    }
                    node.properties.spec.ports[index].name = evt.target.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
                <Form.Select
                  fluid
                  label='Protocol'
                  options={protocolOptions}
                  placeholder='TCP'
                  value={port ? port.protocol : ''}
                  onChange={(evt,data) => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.spec) {
                      node.properties.spec = {}
                    }
                    if (!node.properties.spec.ports) {
                      node.properties.spec.ports = []
                    }
                    node.properties.spec.ports[index].protocol = data.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
              </Form.Group> 

              <div style={styles.line}/>
            </div>) : null 
          } 
        </Form>

      </div>
    )
  }
}

const styles = {
  labelParent: {
    flex: 1,
    display: 'flex',
    marginTop: 10,
    alignItems: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '300',
  },
  textField: {
    marginTop: 10,
    width: '100%',
    height: 45,
    fontFamily: 'inherit',
    fontSize: 14,
  },
  strategyParent: {
    display: 'flex',
    flexDirection: 'row'
  },
  dropDown: {
    flex: 1,
    marginTop: 16,
  },
  rollingUpdateParent: {
    display: 'flex',
    flexDirection: 'column'
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8
  },
  labelParent3: {
    display: 'flex',
    marginTop: 10,
    marginRight: 4,
    alignItems: 'center',
  },
  addButton: {
    marginTop: 12,
  },
  line: {
    flex: 1,
    width: '100%',
    display: 'flex',
    marginBottom: 4,
    marginBottom: 10,
    height: 2,
    backgroundColor: 'rgb(240, 240, 240)',
  }
}
export default ServiceView