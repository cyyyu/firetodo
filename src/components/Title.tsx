import * as React from 'react'
import { css } from 'glamor'

const style_Title = css({
  '& h1': {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    textShadow: '0 0 4px #222'
  }
})

const Title = props => (
  <div {...style_Title}>
    <h1>Firetodo</h1>
  </div>
)

export default Title
