import * as React from 'react'
import { observer } from 'mobx-react'
import { css, style } from 'glamor'
import Input from './Input'
import Title from './Title'

const style_Header = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const Header = observer(props => {
  const { store } = props
  return (
    <div {...style_Header}>
      <Title store={store} />
      <Input store={store} />
    </div>
  )
})

export default Header
