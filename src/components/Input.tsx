import * as React from 'react'
import { observer } from 'mobx-react'
import { css, style } from 'glamor'

const style_Input = css({
  margin: '0 auto',
  width: '85%',
  maxWidth: 350,
  overflow: 'auto',
  padding: '6px 12px',
  display: 'flex',
  '& input': {
    width: '100%',
    border: 'none',
    borderRadius: 4,
    padding: '12px 12px',
    fontSize: 16,
    '&:focus, &:active': {
      outline: 'none'
    }
  },
  '& button': {
    background: '#222',
    border: 'none',
    borderRadius: 4,
    padding: '8px 14px',
    color: 'white',
    '&:focus, &:active': {
      outline: 'none'
    }
  }
})

const Input = observer(props => {
  const { store } = props
  return (
    <div {...style_Input}>
      <input value={store.edittingItem} onChange={store.updateEdittingItem} />
      <button onClick={store.addItem}>ADD</button>
    </div>
  )
})

export default Input
