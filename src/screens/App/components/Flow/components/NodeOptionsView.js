/** @jsx jsx */
import { 
  Component 
} from 'react'
import { jsx } from '@emotion/core'
import { AiOutlineFork, AiOutlineFieldTime } from "react-icons/ai"
import { TiFlowSwitch } from "react-icons/ti"
import { MdRefresh } from "react-icons/md"
import { RiStackLine } from "react-icons/ri"
import { FiBox } from "react-icons/fi"
import { GrStackOverflow } from "react-icons/gr"
import { BsViewStacked, BsInbox, BsInboxFill } from "react-icons/bs"
import { FaExchangeAlt, FaDatabase } from "react-icons/fa"
import { Input} from 'semantic-ui-react'

class NodeOptionsView extends Component {

  getDeploymentView(node) {
    return (
      <div style={styles.width100}>
      
        <div style={styles.header}>
          {
            node.type === "Cron Job" && <AiOutlineFieldTime size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Daemon Set' && <RiStackLine style={styles.joinIcon} size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Deployment' && <MdRefresh size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Job' && <TiFlowSwitch style={styles.joinIcon} size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Pod' && <FiBox size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Replica Set' && <GrStackOverflow style={styles.joinIcon} size="18" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Stateful Set' && <BsViewStacked size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Ingress' && <AiOutlineFork style={styles.splitIcon} size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Service' && <FaExchangeAlt size="17" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Container' && <BsInboxFill size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Init Container' && <BsInbox size="20" color="rgb(100, 100, 100)" />
          }
          {
            node.type === 'Persistent Volume Claim' && <FaDatabase size="18" color="rgb(100, 100, 100)" />
          }
          <span style={styles.val}> {node.type && node.type.toUpperCase()} </span>
        </div>

        <div style={styles.header2}>
          <div style={styles.headingParent}>
            <span style={styles.heading}>{node.type} INFO</span>
          </div>

          <div style={styles.selectorContainer}>
            <div style={styles.labelParent}>
              <span style={styles.label}>Name</span>
            </div>
            <Input 
              size="small" 
              style={styles.textField} 
              placeholder={"Enter " + node.type + " Name"}
              variant="filled" 
              value={node.properties ? node.properties.name : ''}
              onChange={evt => {
                if (!node.properties) {
                  node.properties = {}
                }
                node.properties.name = evt.target.value
                if (this.props.onNodeChange) {
                  this.props.onNodeChange(node)
                }
              }}
            />
            {
              node.properties && node.properties.name && (! /^(?!http)[a-z0-9-]*$/.test(node.properties.name) || node.properties.name.startsWith("-")) &&
              <span style={styles.errorMessage}> 
                - Names should only contain lowercase alphanumeric and hyphens 
                <br/> 
                - Name should start and end with lowercase alphanumeric 
                <br/> 
                - Node name should not start with http 
              </span>
            }  
          </div>
        </div>
      </div>
    )
  }

  convertConfigToDict(formData)
  {
    var configDict = {...formData}
    Object.keys(formData).forEach((k) => {
      if (typeof formData[k] === 'undefined') {
        formData[k] = ""
      }
      var value = {"type": "value", "value": formData[k]}
      configDict[k] = value

      // TODO: type: "ref"
    })
    return configDict
  }

  convertConfigToValue(configDict)
  {
    var configValue = {...configDict}
    Object.keys(configDict).forEach((k) => {
      var value = configDict[k]
      if (value["type"] === "value")
      configValue[k] = value["value"]

      // TODO: type: "ref"
    })
    return configValue
  }

    
  getNodeView(node) {
    return (
      this.getDeploymentView(node)
    )
  }

  render() {
    const node = this.props.node

    console.log("node", node)
    return (
      <div style={{
        ...styles.root,
        ...(
          node ? {} : {
            right: -300,
          }
        )
      }}>
        {
          node
          ? (
            this.getNodeView(node)
          ) : (
            <div style={styles.noNodeSelected}>
              No Node Selected
            </div>
          )
        }
        
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    // padding: 15,
    width: 300,
    height: 'calc(100% - 70px)',
    position: 'absolute',
    right: 0,
    // top: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderLeft: '1px solid rgb(227, 229, 231)',
    transition: 'all 0.2s ease-in-out',
    overflowY: 'auto',
  },
  width100: {
    width: '100%',
  },
  header: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headingParent: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  heading: {
    color: 'rgb(80, 80, 80)',
    // marginTop: 15,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: '600',
    width: '100%',
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    // borderRadius: 4,
    // borderTop: '1px solid rgba(0, 0, 0, 0.07)',
    backgroundColor: 'rgb(245, 247, 248)',
    // textAlign: 'left',
  },
  heading2: {
    color: 'rgb(80, 80, 80)',
    // marginTop: 30,
    marginBottom: 15,
    fontSize: 13,
    fontWeight: '600',
    width: '100%',
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    // borderRadius: 4,
    // borderTop: '1px solid rgba(0, 0, 0, 0.07)',
    backgroundColor: 'rgb(245, 247, 248)',
    // textAlign: 'left',
  },
  val: {
    fontSize: 16,
    width: '100%',
    fontWeight: '300',
    textAlign: 'left',
    marginLeft: 10,
    // marginTop: 5,
    // marginBottom: 15,
  },
  textField: {
    marginTop: 10,
    width: '100%',
    height: 45,
    fontFamily: 'inherit',
    fontSize: 14,
  },
  noNodeSelected: {
    display: 'flex',
    // justifyContent: 'center',
    width: '100%',
    marginTop: 5,
    fontSize: 16,
    color: 'grey',
    fontWeight: '200',
    // border: '1px solid black',
  },
  selectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  selectorContainer2: {
    marginBottom: 35,
  },
  labelParent: {
    display: 'flex',
    marginTop: 10,
    alignItems: 'center',
  },  
  label: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '300',
  },
  versionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '.28571429rem',
    maxWidth: '100%',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  label2: {
    flex: 1,
    textAlign: 'left',
    // fontSize: 12,
    diaply: 'inline-block',
    fontWeight: '300',
    marginTop: 5,
    marginBottom: 5,
    color: 'rgb(50, 50, 50)',
    wordBreak: 'break-word',
  },
  labelIcon: {
    margin: 4,
    color: 'rgb(80, 80, 80)',
    cursor: 'pointer',
  },
  selectorParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginRight: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgb(230, 232, 236)',
    borderRadius: 4,
    // width: 200,
    height: 45,
    marginTop: 7,
  },
  dropdown: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  progressParent: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    height: 45,
    // border: '1px solid black',
    marginTop: 10,
  },
  progressLabel: {
    marginLeft: 10,
  },
  cellKey: {
    color: 'grey',
    fontWeight: '300',
  },
  cellValue: {
    wordBreak: 'break-word',
    fontWeight: '300',
  },
  formParent: {
    width: '100%',
    padding: '0px 15px',
  },
  splitIcon: {
    transform: 'rotate(90deg)',
  },
  joinIcon: {
    transform: 'rotate(-90deg)',
  },
  errorMessage: {
    flex: 1,
    textAlign: 'left',
    display: 'flex',
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 5,
    color: 'rgb(250, 0, 0)',
    fontSize: '85%',
  },
  selectInvocableButton:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 10px",
    backgroundColor: "rgb(33, 133, 209)",
    borderRadius: "4px",
    height: "45px",
    marginTop: "15px",
    cursor: "pointer",
    color: "white"
  },
  invocableSearchModal:{
    padding: "0px 17px"
  }
}

export default NodeOptionsView
