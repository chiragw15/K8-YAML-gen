/** @jsx jsx */
import React, {Component} from 'react'
import { SidebarItem } from './components/SidebarItem'
import { FlowChart } from "@mrblenny/react-flow-chart"
import { jsx } from '@emotion/core'
import styled from 'styled-components'
import * as utils from '../../../../lib/utils'
import constants from '../../../../constants'
import { AiOutlineFork, AiOutlineFieldTime } from "react-icons/ai"
import { TiFlowSwitch } from "react-icons/ti"
import { MdRefresh } from "react-icons/md"
import { RiStackLine } from "react-icons/ri"
import { FiBox } from "react-icons/fi"
import { GrStackOverflow } from "react-icons/gr"
import { BsViewStacked, BsInbox, BsInboxFill } from "react-icons/bs"
import { FaExchangeAlt, FaDatabase } from "react-icons/fa"
import { mapValues } from 'lodash'
import * as actions from '@mrblenny/react-flow-chart/src/container/actions'
import images from '../../../../images'
import NodeOptionsView from './components/NodeOptionsView'
import Header from './components/header'

const CanvasOuterCustom = styled.div`
  position: relative;
  background-size: 10px 10px;
  // background-color: #4f6791;
  background-color: rgb(240, 242, 246);
  // background-color: white;
  // background-image:
  //   linear-gradient(90deg, rgb(240, 242, 244) 1px,transparent 0),
  //   linear-gradient(180deg, rgb(240, 242, 244) 1px,transparent 0);
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: not-allowed;
`

const PortCustom = (props: IPortDefaultProps) => {
  // console.log("props", props)
  return (
    <div style={{
      ...styles.customPort,
      ...(
        props.port.type === 'left' ? styles.customPortLeft : styles.customPortRight
      )}}>
    </div>
  )
}

class Flow extends Component {

  constructor(props) {
    super(props);
    this.state = {chart: this.getChart()};
  }

  NodeInnerCustom = ({ node, config }) => {
    const chart = this.getChart()
    // const chart = this.state.chart
    return (
      <div style={{
        ...styles.nodeInnerParent,
        ...((chart.selected.type === 'node' && chart.selected.id === node.id)
        ? styles.selectedNodeInnerParent
        : {})
      }}>
        <div style={styles.nodeInnerContent}>
          <div style={styles.nodeInnerIconParent}>
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
          </div>
          <span style={styles.nodeInnerSpan}> &nbsp;&nbsp;&nbsp;&nbsp;{node.properties && node.properties.name ? (
            `${node.type} - ${node.properties.name}`
          ) : node.type}&nbsp;&nbsp;&nbsp;&nbsp; </span>
        </div>
      </div>
    )
  }

  getChart() {
    return (this.state != null && this.state.chart != null) ? this.state.chart : utils.copyDict(constants.INITIAL_FLOW)
  }

  stateActions = mapValues(actions, (func: any) =>
    (...args: any) => {
      let chart = this.getChart()

      chart = {
        ...chart, 
        ...func(...args)(chart)
      }
      console.log('chirag')
      // console.log(chart)
      this.setState({"chart": chart})
      // console.log(this.state.chart)
      // this.props.setFlowJsonInfo(1, 'master', chart, {})
    } 
  )

  NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
    // const chart = this.getChart()
    var chart = this.state.chart
    delete otherProps['isSelected']
    
    // console.log("children", children)
    return (
      <div ref={ref} {...otherProps} style={{
        ...styles.node,
        ...(
          otherProps.style ? otherProps.style : {}
        ),
        ...((chart.selected.type === 'node' && chart.selected.id === node.id)
        ? styles.nodeSelected
        : {})
      }}>
        {children}
      </div>
    )
  })

  render() {

    return (
      <div style={styles.root}>
        <div style={styles.sideBar}>
          {/* <div style={styles.sideBarSection}> */}
          <img alt='logo' style={styles.img} src={images.LOGO} />
            <div style={styles.message}>
              <div style={styles.palettleTitleContainer}>
                <span style={styles.palettleTitle}> Palette </span>
              </div>
              <span style={styles.italic}>Drag and drop these items onto the canvas.</span>
            </div>
            
            <div style={styles.sidebarItemHeadingContainer}>
              <span style={styles.sidebarItemHeading}> Workloads </span>
            </div>

            <SidebarItem
              type="Cron Job"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }} 
            />

            <SidebarItem
              type="Daemon Set"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <SidebarItem
              type="Deployment"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <SidebarItem
              type="Job"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />
            
            <SidebarItem
              type="Pod"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <SidebarItem
              type="Replica Set"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <SidebarItem
              type="Stateful Set"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <div style={styles.sidebarItemHeadingContainer}>
              <span style={styles.sidebarItemHeading}> Discovery </span>
            </div>

            <SidebarItem
              type="Ingress"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }} 
            />

            <SidebarItem
              type="Service"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <div style={styles.sidebarItemHeadingContainer}>
              <span style={styles.sidebarItemHeading}> Containers </span>
            </div>
            
            <SidebarItem
              type="Container"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <SidebarItem
              type="Init Container"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }}
            />

            <div style={styles.sidebarItemHeadingContainer}>
              <span style={styles.sidebarItemHeading}> Storage </span>
            </div>

            <SidebarItem
              type="Persistent Volume Claim"
              ports={ { port1: { id: 'port1', type: 'left', }, port2: { id: 'port2', type: 'right', }, }} 
            />

          {/* </div> */}
        </div>
        
        <div style={styles.pageParent}>
          
          <Header/>

          <div style={styles.page}> 
            <div style={styles.flowChartParent}>
              <FlowChart
                chart={this.state.chart}
                style={styles.flowChart}
                callbacks={this.stateActions} 
                Components={{
                  NodeInner: this.NodeInnerCustom,
                  Node: this.NodeCustom,
                  CanvasOuter: CanvasOuterCustom,
                  Port: PortCustom,
                  Link: (props) => {
                    const { startPos, endPos, link, isSelected, isHovered } = props                          
                    
                    let points = []
                    let c1 = utils.copyDict(startPos)
                    let c2 = utils.copyDict(endPos) 
                    let sign = c2.y > c1.y ? 1 : -1

                    if (startPos.x > endPos.x) {
                      let xDiff = 10 + Math.min(10, 0.1 * Math.abs(c1.x - c2.x))
                      let yDiff = 15
                      let yCorrection = sign * (c2.y - c1.y) < 200 ? 7 : 0
                      let a1 = utils.copyDict(c1)
                      let a2 = { x: a1.x + xDiff, y: a1.y }
                      let a3 = { x: a2.x + xDiff, y: a2.y + sign * yCorrection }
                      let a4 = { x: a3.x, y: a2.y + sign * yDiff }
                      let a5 = { x: a4.x, y: a4.y + sign * yDiff }
                      let a6 = { x: (c1.x + c2.x) / 2, y: (c1.y + c2.y) / 2, }
                      let b1 = utils.copyDict(c2)
                      let b2 = { x: b1.x - xDiff, y: b1.y }
                      let b3 = { x: b2.x - xDiff, y: b2.y - sign * yDiff, }
                      let b4 = { x: b3.x, y: b3.y - sign * yDiff + sign * yCorrection, }
                      points = [a1, a2, a3, a4, a5, a6, b4, b3, b2, b1]
                    } else {
                      let xOffset = Math.min(75, .6 * Math.abs(c1.x - c2.x) + .4 * Math.abs(c1.y - c2.y))
                      let a1 = utils.copyDict(c1)
                      let a2 = { x: a1.x + xOffset, y: a1.y}
                      let b1 = utils.copyDict(c2)
                      let b2 = { x: b1.x - xOffset, y: b1.y}
                      points = [a1, a2, b2, b1]
                    }
                    
                    return (
                      <svg 
                        style={{
                          overflow: 'visible', 
                          position: 'absolute',
                          cursor: 'pointer', 
                          left: '0px', 
                          right: '0px'
                        }} 
                        onClick={(e) => {
                          this.stateActions.onLinkClick({ linkId: link.id })
                          e.stopPropagation()
                        }}
                        onMouseEnter={(e) => {
                          this.stateActions.onLinkMouseEnter({ linkId: link.id })
                          e.stopPropagation()
                        }}
                        onMouseLeave={(e) => {
                          this.stateActions.onLinkMouseLeave({ linkId: link.id })
                          e.stopPropagation()
                        }}
                      >
                        {
                          points.length === 10 
                          ? (
                            <path d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}
                              S ${points[4].x} ${points[4].y} ${points[5].x} ${points[5].y}
                              S ${points[6].x} ${points[6].y} ${points[7].x} ${points[7].y}
                              S ${points[8].x} ${points[8].y} ${points[9].x} ${points[9].y}
                            `} stroke="cornflowerblue" strokeWidth="3" fill="none" /> 
                          )
                          : (
                            points.length === 4
                            ? (
                              <path d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}
                              `} stroke="cornflowerblue" strokeWidth="3" fill="none" /> 
                            ) : null
                          )
                        }
                        {/* {
                          points.map(({x, y}) => (
                            <circle cx={`${x}`} cy={`${y}`} r="5" stroke="black" fill="black" />
                          ))
                        } */}
                        {
                          isSelected || isHovered
                          ? (
                            (points.length === 10 && <path d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}
                              S ${points[4].x} ${points[4].y} ${points[5].x} ${points[5].y}
                              S ${points[6].x} ${points[6].y} ${points[7].x} ${points[7].y}
                              S ${points[8].x} ${points[8].y} ${points[9].x} ${points[9].y}
                            `} stroke="cornflowerblue" opacity="0.15" strokeWidth="18" fill="none" />)
                            || (points.length === 4 && <path d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}
                            `} stroke="cornflowerblue" opacity="0.15" strokeWidth="18" fill="none" />) || null
                          )
                          : (
                            (points.length === 10 && <path d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}
                              S ${points[4].x} ${points[4].y} ${points[5].x} ${points[5].y}
                              S ${points[6].x} ${points[6].y} ${points[7].x} ${points[7].y}
                              S ${points[8].x} ${points[8].y} ${points[9].x} ${points[9].y}
                            `} stroke="cornflowerblue" opacity="0.001" strokeWidth="18" fill="none" />)
                            || (points.length === 4 && <path d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}
                            `} stroke="cornflowerblue" opacity="0.001" strokeWidth="18" fill="none" />) || null
                          )
                        }
                      </svg>
                    )
                  },
                }}
              />
            </div>
            {
              <NodeOptionsView node={
                (Object.keys(this.state.chart.selected).length > 0 && this.state.chart.selected.type === 'node')
                ? this.state.chart.nodes[this.state.chart.selected.id]
                : null
              } onNodeChange={node => {
                // this.props.setFlowJsonInfo(flowId, selectedFlowEnv, chart, {})
              }}/>
            }
          </div>

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
    // height: '100%',
    // maxHeight: '100vh',
    maxWidth: '100vw',
    // position: 'relative'
    // overflowY: 'auto'
    // position: 'relative',
  },
  pageParent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // maxHeight: '100%',
    // maxWidth: '100%',
    maxHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    // maxWidth: 'calc(91vw)',
    maxHeight: '100vh',
    overflow: 'hidden'
  },
  nodeoptions: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  flowChartParent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '91vh',
    overflow: 'hidden',
  },
  sideBar: {
    width: 250,
    // height: '90vh',
    // height: 'calc(100% - 70px)',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    paddingTop: 12,
    height: '100vh',
    // marginRight: 2,
    borderRight: '1px solid rgb(227, 229, 231)',
    // borderRight: '3px solid rgb(104, 152, 233)',
    // oberflowX: 'fixed',
    position: 'relative',
    overflowY: 'scroll',
    padding: 15,
  },
  sideBarSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    position: 'relative',
    padding: 15,
  },
  sidebarItemHeading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebarItemHeadingContainer: {
    marginTop: 24,
    marginBottom: 12
  },
  img: {
    width: 220,
    height: 50,
    marginBottom: 30
  },
  selectEnvMessage: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(200, 200, 200)',
  },
  node: {
    position: 'absolute',
    background: 'white',
    transition: 'border 0.3s ease 0s, margin-top 0.3s ease 0s, box-shadow 0.3s ease 0s, margin-top 0.3s ease 0s',
    // borderRadius: '0 5px 0 5px',
    borderRadius: 5,
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0,0,0,.12)',
  },
  nodeSelected: {
    // boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    // boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    borderRadius: 5,
    // borderRadius: '0 5px 0 5px',
    boxShadow: 'none',
  },
  nodeInnerParent: {
    border: '3px solid rgba(0, 0, 0, 0)',
    // borderRadius: '0 5px 0 5px',
    borderRadius: 5,
    transition: 'border 0.3s ease 0s, margin-top 0.3s ease 0s, box-shadow 0.3s ease 0s, margin-top 0.3s ease 0s',
  },
  selectedNodeInnerParent: {
    border: '3px solid rgb(103, 151, 234)',
    // borderRadius: '0 5px 0 5px',
    borderRadius: 5,
    transition: 'border 0.3s ease 0s, margin-top 0.3s ease 0s, box-shadow 0.3s ease 0s, margin-top 0.3s ease 0s',
  },
  nodeInnerContent: {
    padding: 5,
    background: 'white',
    borderRadius: 5,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  nodeInnerIconParent: {
    borderRight: '1px solid rgb(230, 230, 230)',
    padding: 5,
    paddingRight: 14,
    paddingLeft: 10,
  },
  nodeInnerSpan: {
  },
  port: {
    height: 30,
    width: 30,
    background: 'white',
    borderRadius: 15,
    border: '3px solid rgb(103, 151, 234)',
  },
  customPort: {
    width: 14,
    height: 14,
    borderRadius: 5,
    // borderRadius: 10,
    // border: '1px solid cornflowerblue',
    border: '3px solid cornflowerblue',
    background: 'white',
    // border: '1px solid rgb(220, 220, 220)',
    // background: 'rgb(200, 200, 200)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customPortLeft: {
    // transform: 'translate(3px, 3px)',
    transform: 'translate(3px)',
  },
  customPortRight: {
    // transform: 'translate(-3px, -3px)',
    transform: 'translate(-3px)',
  },
  message: {
    // marginBottom: 5,
    textAlign: 'left',
    // marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  palettleTitle: {
    fontSize: 18,
    fontWeight: '300',
  },
  italic: {
    fontSize: 13,
    color: 'grey',
    fontWeight: '300',
  },
  
  splitIcon: {
    transform: 'rotate(90deg)',
  },
  joinIcon: {
    transform: 'rotate(-90deg)',
  },
  infoContainer: {
    marginTop: 15,
    display: 'flex',
  },
  infoKeyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoValueContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoKey: {
    fontWeight: '300',
    color: 'grey',
    // width: 50,
    textAlign: 'right',
    marginRight: 10,
    height: 21,
  },
  infoValue: {
    display: 'flex',
    alignItems: 'center',
    height: 21,
  },
  infoGrow: {
    flex: 1,
    height: 21,
  },
  infoValue2: {
    display: 'flex',
    alignItems: 'center',
    height: 21,
  },
  deploymentStatus: {
    marginRight: 10,
  },
  cellKey: {
    color: 'grey',
    fontWeight: '300',
  },
  cellValue: {
    wordBreak: 'break-word',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: 20,
  },
  viewStatusButton: {
    color: '#007bff',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  statusTable1: {
    borderCollapse: 'separate',
    borderSpacing: 10,
    // padding: 5,
  },
  statusTable2: {
    borderCollapse: 'separate',
    borderSpacing: 5,
    padding: 5,
    background: 'rgb(245, 247, 250)',
    marginTop: 10,
    borderRadius: 5,
  },
  statusTable2Header: {
    textAlign: 'center',
  },
  statusTable2Td: {
    padding: 5,
  },
  statusTable2StatusTd: {
    textAlign: 'center',
    color: 'white',
    borderRadius: 5,
    padding: 5,
  },
  statusTable2StatusTdTrue: {
    background: 'green',
  },
  statusTable2StatusTdFalse: {
    background: 'firebrick',
    // background: 'crimson',
  },
  paletteInfoIcon: {
    marginLeft: '5px',
    height: 'unset',
    width: '17px',
    display: 'flex',
    color: 'black'
  },
  paletteInfoLink: {
    display: 'flex',
    color: 'black'
  },
  palettleTitleContainer: {
    display: 'flex',
    alignItems: 'stretch'
  }
}

export default Flow;