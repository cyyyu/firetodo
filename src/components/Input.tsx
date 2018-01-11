import * as React from 'react'
import { observer } from 'mobx-react'

const Input = observer(props => {
  const { store } = props
  return (
    <div>
      <input value={store.edittingItem} onChange={store.updateEdittingItem} />
      <button onClick={store.addItem}>Add</button>
    </div>
  )
})

export default Input
