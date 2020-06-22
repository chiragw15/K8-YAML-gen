import * as React from 'react'
import { INode, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart"

import { AiOutlineFork, AiOutlineFieldTime } from "react-icons/ai"
import { TiFlowSwitch } from "react-icons/ti"
import { MdRefresh } from "react-icons/md"
import { RiStackLine } from "react-icons/ri"
import { FiBox } from "react-icons/fi"
import { GrStackOverflow } from "react-icons/gr"
import { BsViewStacked, BsInbox, BsInboxFill } from "react-icons/bs"
import { FaExchangeAlt, FaDatabase } from "react-icons/fa"

export interface ISidebarItemProps {
  type: string,
  ports: INode,
  properties: any,
}

export const SidebarItem = ({ type, ports, properties }: ISidebarItemProps) => {
  return (
    <div
      style={styles.parent}
      draggable={true}
      onDragStart={ (event) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports, properties }))
      } }
    >
      <div style={styles.iconParent}>
        {
          type === "Cron Job" && <AiOutlineFieldTime size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Daemon Set' && <RiStackLine style={styles.joinIcon} size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Deployment' && <MdRefresh size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Job' && <TiFlowSwitch style={styles.joinIcon} size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Pod' && <FiBox size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Replica Set' && <GrStackOverflow style={styles.joinIcon} size="18" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Stateful Set' && <BsViewStacked size="18" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Ingress' && <AiOutlineFork style={styles.splitIcon} size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Service' && <FaExchangeAlt size="17" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Container' && <BsInboxFill size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Init Container' && <BsInbox size="20" color="rgb(100, 100, 100)" />
        }
        {
          type === 'Persistent Volume Claim' && <FaDatabase size="18" color="rgb(100, 100, 100)" />
        }
      </div>
      {type}
    </div>
  )
}


const styles = {
  parent: {
    padding: 7,
    fontSize: 14,
    background: 'rgb(245, 247, 249)',
    cursor: 'move',
    marginTop: 10,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
  },
  iconParent: {
    borderRight: '1px solid rgb(230, 230, 230)',
    padding: 5,
    paddingRight: 10,
    paddingLeft: 5,
    marginRight: 10,
  },
  splitIcon: {
    transform: 'rotate(90deg)',
  },
  joinIcon: {
    transform: 'rotate(-90deg)',
  },
}
