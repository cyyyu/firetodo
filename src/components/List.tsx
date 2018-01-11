import * as React from 'react'
import { observer } from 'mobx-react'

const List = observer(props => (
  <ul>{props.store.list.map(item => <li key={item.id}><button onClick={() => props.store.removeItem(item.id)}>remove</button>{item.text}</li>)}</ul>
))

export default List
