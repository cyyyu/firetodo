import * as React from 'react'
import { render } from 'react-dom'
import { css } from 'glamor'
import { observer } from 'mobx-react'

import Login from './Login'
import Loading from './Loading'
import AppStore, { AppStore as AppStoreType } from '../store'
import List from './List'
import Input from './Input'
import Title from './Title'

// global styles
css.global('html, body', {
  margin: 0,
  padding: 0,
  background: 'rgb(84, 89, 106)'
})

css.global('*', {
  boxSizing: 'border-box',
  fontFamily: "'Roboto', sans-serif"
})

const style_App = css({})

interface AppProps {
  store: AppStoreType
}

const App = observer(props => {
  const { store } = props

  // show loading when checking status
  if (store.checkingLoginStatus) {
    return <Loading />
  }

  // show login page
  if (!store.loggedIn) {
    return <Login store={store} />
  }

  return (
    <div {...style_App}>
      <Title store={store} />
      <List store={store} />
      <Input store={store} />
    </div>
  )
})

render(<App store={AppStore} />, document.querySelector('#app'))
