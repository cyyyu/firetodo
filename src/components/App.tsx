import * as React from 'react'
import { render } from 'react-dom'
import { css } from 'glamor'
import { observer, Provider, inject } from 'mobx-react'

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
  backgroundColor: '#F6F6E9',
  // Disables pull-to-refresh and overscroll glow effect.
  overscrollBehaviorY: 'none'
})

css.global('*', {
  boxSizing: 'border-box',
  fontFamily: "'Roboto', sans-serif",
  cursor: 'default'
})

const style_App = css({
  padding: '0 18px'
})

interface AppProps {
  appStore: AppStoreType
}

const App = inject('appStore')(
  observer(props => {
    const { appStore } = props

    // show loading when checking status
    if (appStore.checkingLoginStatus) {
      return <Loading />
    }

    // show login page
    if (!appStore.loggedIn) {
      return <Login />
    }

    return (
      <div {...style_App}>
        <Header />
        <List />
      </div>
    )
  })
)

render(
  <Provider appStore={AppStore}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
registerServiceWorker()
