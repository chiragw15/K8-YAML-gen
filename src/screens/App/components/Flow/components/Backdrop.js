/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Dimmer, Loader } from 'semantic-ui-react'


export default function SimpleBackdrop(props) {

  let inverted = false
  if (props.inverted) {
    inverted = props.inverted
  }
  return (
    <Dimmer active={props.open} inverted={inverted}>
      <Loader inverted={inverted}>{props.label}</Loader>
    </Dimmer>
  )
}
