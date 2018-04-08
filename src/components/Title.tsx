import * as React from 'react'
import { css } from 'glamor'
import { Github, LogOut } from 'react-feather'
import { inject } from 'mobx-react'

const style_Title = css({
  '& h1': {
    fontSize: 24,
    color: '#7BCECC',
    '& span': {
      float: 'right'
    },
    '& a': {
      float: 'right',
      color: '#7BCECC',
      margin: 3
    }
  }
})

const Title = props => (
  <div {...style_Title}>
    <h1>
      Firetodo
      <a onClick={props.appStore.logout}>
        <LogOut />
      </a>
      <span>∙</span>
      <a href="https://github.com/cyyyu/firetodo" target="_blank">
        <Github />
      </a>
    </h1>
  </div>
)

export default inject('appStore')(Title)
