/** @jsx jsx */
import { Component } from 'react'
import { jsx } from '@emotion/core'
import { Input, Dropdown, Form } from 'semantic-ui-react'

class DeploymentView extends Component {

  render() {
    const node = this.props.node
    const strategyOptions = [
      {'key': 'a', 'value': 'Rolling Update', 'text': 'Rolling Update'},
      {'key': 'b', 'value': 'Recreate', 'text': 'Recreate'}
    ]

    return (
      <div>
        <div style={styles.labelParent}>
          <span style={styles.label}>Replicas</span>
        </div>

        <Input 
          size="small" 
          style={styles.textField} 
          placeholder={"Enter " + node.type + " Replicas"}
          variant="filled" 
          value={node.properties && node.properties.spec ? node.properties.spec.replicas : ''}
          onChange={evt => {
            if (!node.properties) {
              node.properties = {}
            }
            if (!node.properties.spec) {
              node.properties.spec = {}
            }
            node.properties.spec.replicas = evt.target.value
            if (this.props.onSubNodeChange) {
              this.props.onSubNodeChange(node)
            }
          }}
        />

        <div style={styles.strategyParent}>
          <div style={styles.labelParent}>
            <span style={styles.label}>Update Strategy</span>
          </div>
          
          <Dropdown 
            style={styles.dropDown} 
            placeholder='strategy' 
            fluid 
            selection 
            options={strategyOptions} 
            value={node.properties && node.properties.spec ? node.properties.spec.strategy : ''}
            onChange={(evt,data) => {
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.spec) {
                node.properties.spec = {}
              }
              node.properties.spec.strategy = data.value
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />

        </div>

        { (node.properties && node.properties.spec && node.properties.spec.strategy && node.properties.spec.strategy === 'Rolling Update') ?
          <div style={styles.rollingUpdateParent}>
            <div >
              <div style={styles.labelParent}>
                <span style={styles.label}>Max Surge</span>
              </div>

              <Input 
                size="small" 
                style={styles.textField} 
                placeholder={"Enter Max Surge"}
                variant="filled" 
                value={node.properties && node.properties.spec ? node.properties.spec.surge : ''}
                onChange={evt => {
                  if (!node.properties) {
                    node.properties = {}
                  }
                  if (!node.properties.spec) {
                    node.properties.spec = {}
                  }
                  node.properties.spec.surge = evt.target.value
                  if (this.props.onSubNodeChange) {
                    this.props.onSubNodeChange(node)
                  }
                }}
              />
            </div>
            
            <div >
              <div style={styles.labelParent}>
                <span style={styles.label}>Max Unavailable</span>
              </div>

              <Input 
                size="small" 
                style={styles.textField} 
                placeholder={"Enter Max Unavailable"}
                variant="filled" 
                value={node.properties && node.properties.spec ? node.properties.spec.unavailable : ''}
                onChange={evt => {
                  if (!node.properties) {
                    node.properties = {}
                  }
                  if (!node.properties.spec) {
                    node.properties.spec = {}
                  }
                  node.properties.spec.unavailable = evt.target.value
                  if (this.props.onSubNodeChange) {
                    this.props.onSubNodeChange(node)
                  }
                }}
              />
            </div>
          </div>: null
        }
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
  }
}
export default DeploymentView