import * as React from 'react'
import { render } from 'react-dom'
import { css } from 'glamor'
import { observer } from 'mobx-react'

// components
import Login from './Login'
import Loading from './Loading'
import AppStore, { AppStore as AppStoreType } from '../store'
import List from './List'
import Header from './Header'

// helpers
import registerServiceWorker from '../register-service-worker'

// global styles
css.global('html, body', {
  margin: 0,
  padding: 0,
  backgroundColor: 'rgb(84, 89, 106)',
  // Disables pull-to-refresh and overscroll glow effect.
  overscrollBehaviorY: 'none'
})

css.global('*', {
  boxSizing: 'border-box',
  fontFamily: "'Roboto', sans-serif",
  cursor: 'default',
  userSelect: 'none'
})

const style_App = css({
  padding: '0 18px'
})

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
      <Header store={store} />
      <List store={store} />
    </div>
  )
})

render(<App store={AppStore} />, document.querySelector('#app'))
registerServiceWorker()
