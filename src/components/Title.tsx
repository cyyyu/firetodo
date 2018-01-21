import * as React from 'react'
import { css } from 'glamor'
import { Github, LogOut } from 'react-feather'

const style_Title = css({
  '& h1': {
    fontSize: 24,
    color: '#fff',
    textShadow: '0 0 4px #222',
    '& span': {
      float: 'right',
      textShadow: 'none'
    },
    '& a': {
      float: 'right',
      color: '#fff',
      margin: 3
    }
  }
})

const Title = props => (
  <div {...style_Title}>
    <h1>
      Firetodo
      <a onClick={props.store.logout}>
        <LogOut />
      </a>
      <span>∙</span>
      <a href="https://github.com/cyyyu/firetodo" target="_blank">
        <Github />
      </a>
    </h1>
  </div>
)

export default Title
