import * as React from 'react'

const Login = props => (
  <div>
    <button onClick={props.store.login}>Sign in with Google</button>
  </div>
)

export default Login
