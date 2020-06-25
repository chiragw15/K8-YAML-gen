/** @jsx jsx */
import { Component } from 'react'
import { jsx } from '@emotion/core'
import { Input, Dropdown, Form } from 'semantic-ui-react'
import { MdAddCircleOutline } from "react-icons/md"

class ContainerView extends Component {

  render() {
    const node = this.props.node
    const protocolOptions = [
      {'key': 'a', 'value': 'TCP', 'text': 'TCP'},
      {'key': 'b', 'value': 'UDP', 'text': 'UDP'}
    ]

    return (
      <div>
        <div style={styles.labelParent}>
          <span style={styles.label}>Image</span>
        </div>

        <Input 
          size="small" 
          style={styles.textField} 
          placeholder={"Enter " + node.type + " Image"}
          variant="filled" 
          value={node.properties ? node.properties.image : ''}
          onChange={evt => {
            if (!node.properties) {
              node.properties = {}
            }
            node.properties.image = evt.target.value
            if (this.props.onSubNodeChange) {
              this.props.onSubNodeChange(node)
            }
          }}
        />
        
        <div style={styles.labelContainer}>
          <div style={styles.labelParent3}>
            <span style={styles.label}>Ports</span>
          </div>

          <MdAddCircleOutline 
            style={styles.addButton} 
            size="16" 
            color="rgb(100, 100, 100)" 
            onClick={() => { 
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.ports) {
                node.properties.ports = []
              }
              node.properties.ports.push({'containerPort': '', 'protocol': ''})
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />
        </div>

        <Form>
          {
          (node.properties && node.properties.ports) ? node.properties.ports.map( (port, index) => 
            <div key={port.containerPort}> 
              <Form.Group widths='equal'>
                <Form.Input 
                  fluid 
                  label='Container Port' 
                  placeholder='80' 
                  value={port.containerPort ? port.containerPort : ''}
                  onChange={evt => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.ports) {
                      node.properties.ports = []
                    }
                    node.properties.ports[index].containerPort = evt.target.value
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
                    if (!node.properties.ports) {
                      node.properties.ports = []
                    }
                    node.properties.ports[index].protocol = data.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
              </Form.Group> 
            </div>) : null 
          } 
        </Form>

        <div style={styles.labelContainer}>
          <div style={styles.labelParent3}>
            <span style={styles.label}>Environment Variables</span>
          </div>

          <MdAddCircleOutline 
            style={styles.addButton} 
            size="16" 
            color="rgb(100, 100, 100)" 
            onClick={() => { 
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.envs) {
                node.properties.envs = []
              }
              node.properties.envs.push({'name': '', 'value': ''})
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />
        </div>

        <Form>
          {
          (node.properties && node.properties.envs) ? node.properties.envs.map( (env, index) => 
            <div key={env.name}> 
              <Form.Group widths='equal'>
                <Form.Input 
                  fluid 
                  label='Name' 
                  placeholder='Name' 
                  value={env.name ? env.name : ''}
                  onChange={evt => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.envs) {
                      node.properties.envs = []
                    }
                    node.properties.envs[index].name = evt.target.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
                <Form.Input 
                  fluid 
                  label='Value' 
                  placeholder='Value' 
                  value={env.value ? env.value : ''}
                  onChange={evt => {
                    if (!node.properties) {
                      node.properties = {}
                    }
                    if (!node.properties.envs) {
                      node.properties.envs = []
                    }
                    node.properties.envs[index].value = evt.target.value
                    if (this.props.onSubNodeChange) {
                      this.props.onSubNodeChange(node)
                    }
                  }}
                />
              </Form.Group> 
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
}
export default ContainerView