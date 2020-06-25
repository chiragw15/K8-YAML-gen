/** @jsx jsx */
import { Component } from 'react'
import { jsx } from '@emotion/core'
import { Input, Dropdown, Checkbox } from 'semantic-ui-react'

class PVCView extends Component {

  render() {
    const node = this.props.node
    const strategyOptions = [
      {'key': 'a', 'value': 'File System', 'text': 'File System'},
      {'key': 'b', 'value': 'Block Device', 'text': 'Block Device'}
    ]

    var accesModes = []

    return (
      <div>
        <div style={styles.labelParent}>
          <span style={styles.label}>Capacity</span>
        </div>

        <Input 
          size="small" 
          style={styles.textField} 
          placeholder={"Enter max size"}
          variant="filled" 
          value={node.properties && node.properties.capacity ? node.properties.capacity.storage : ''}
          onChange={evt => {
            if (!node.properties) {
              node.properties = {}
            }
            if (!node.properties.capacity) {
              node.properties.capacity = {}
            }
            node.properties.capacity.storage = evt.target.value
            if (this.props.onSubNodeChange) {
              this.props.onSubNodeChange(node)
            }
          }}
        />

        <div style={styles.strategyParent}>
          <div style={styles.labelParent}>
            <span style={styles.label}>Volume Mode</span>
          </div>
          
          <Dropdown 
            style={styles.dropDown} 
            placeholder='Volume Mode' 
            fluid 
            selection 
            options={strategyOptions} 
            value={node.properties ? node.properties.volumeMode : ''}
            onChange={(evt,data) => {
              if (!node.properties) {
                node.properties = {}
              }
              node.properties.volumeMode= data.value
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />

        </div>
            
        <div style={styles.labelParent}>
          <span style={styles.label}>Access Modes</span>
        </div>
        
        <div style={styles.checkboxParent}>

          <Checkbox 
            style={styles.checkbox}
            label='ReadWriteOnce'
            checked={node.properties && node.properties.accesModes ? node.properties.accesModes.ReadWriteOnce : false}
            onChange={(evt,data) => {
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.accesModes) {
                node.properties.accesModes = {}
              }
              node.properties.accesModes.ReadWriteOnce = data.checked
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />

          <Checkbox 
            style={styles.checkbox}
            label='ReadOnlyMany' 
            checked={node.properties && node.properties.accesModes ? node.properties.accesModes.ReadOnlyMany : false}
            onChange={(evt,data) => {
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.accesModes) {
                node.properties.accesModes = {}
              }
              node.properties.accesModes.ReadOnlyMany = data.checked
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />
          
          <Checkbox 
            style={styles.checkbox}
            label='ReadWriteMany' 
            checked={node.properties && node.properties.accesModes ? node.properties.accesModes.ReadWriteMany : false}
            onChange={(evt,data) => {
              if (!node.properties) {
                node.properties = {}
              }
              if (!node.properties.accesModes) {
                node.properties.accesModes = {}
              }
              node.properties.accesModes.ReadWriteMany = data.checked
              if (this.props.onSubNodeChange) {
                this.props.onSubNodeChange(node)
              }
            }}
          />

        </div>
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
  checkboxParent: {
    display: 'flex',
    flexDirection: 'column'
  },
  checkbox: {
    marginTop: 8,
    marginLeft: 8
  }
}
export default PVCView