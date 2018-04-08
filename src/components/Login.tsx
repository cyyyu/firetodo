import * as React from 'react'
import { css } from 'glamor'
import { inject } from 'mobx-react'
import GoogleIcon from './GoogleIcon'

const style_Login = css({
  margin: '0 auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '50px',
  width: '240px',
  border: 'none',
  textAlign: 'center',
  verticalAlign: 'center',
  boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
  fontSize: '16px',
  lineHeight: '48px',
  display: 'block',
  borderRadius: '1px',
  transition: 'background-color .218s, border-color .218s, box-shadow .218s',
  cursor: 'pointer',
  background: '#fff',
  '& *': {
    cursor: 'pointer'
  }
})

const Login = props => (
  <div {...style_Login} onClick={props.appStore.login}>
    {GoogleIcon}
    <span>Sign In With Google</span>
  </div>
)

export default inject('appStore')(Login)
