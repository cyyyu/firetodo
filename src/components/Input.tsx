import * as React from 'react'
import { observer } from 'mobx-react'
import { css, style } from 'glamor'

const style_Input = css({
  margin: '16px auto',
  width: '85%',
  maxWidth: 350,
  overflow: 'auto',
  padding: '6px 12px',
  display: 'flex',
  '& input': {
    width: '100%',
    border: 'none',
    borderRadius: '4px 0 0 4px',
    padding: '8px 12px',
    fontSize: 14,
    '&:focus, &:active': {
      outline: 'none'
    }
  },
  '& button': {
    background: '#222',
    border: 'none',
    borderRadius: '0 4px 4px 0',
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
      <button onClick={store.addItem}>Add</button>
    </div>
  )
})

export default Input
