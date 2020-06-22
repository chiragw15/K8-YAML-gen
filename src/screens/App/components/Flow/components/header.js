/** @jsx jsx */
import { 
  Component 
} from 'react'
import _ from 'lodash'
import { jsx } from '@emotion/core'
import { Button, Dropdown } from 'semantic-ui-react'
import images from '../../../../images'

class Header extends Component {

  downloadFile() {

  }

  signout() {

  }

  render() {

    const trigger = (
      <span>
        <img alt="user" src={images.USER} style={styles.userIcon}/> Hi, Chirag {loginInfo.name.split(' ')[0]}
      </span>
    )

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
      
        <div style={styles.col2}>
          <Button.Group color='blue'>
            <Button onClick={() => {
              this.downloadFile()
            }}>Download Manifest
            </Button>
          </Button.Group>
        </div>

        <div style={styles.col3}>
          <Dropdown 
            pointing='top right'
            selectOnBlur={false}
            trigger={trigger} 
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
    backgroundColor: 'rgb(245, 247, 250)',
    borderBottom: '1px solid rgb(237, 239, 241)',
  },
  col1: {
    width: 301,
    paddingLeft: 15,
    fontSize: 25,
    flex: 1,
    fontWeight: '300',
    display: 'flex',
    alignItems: 'center',
  },
  col2: {
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  col3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  userIcon: {
    width: 30,
    height: 30,
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
  }
}

export default Header
