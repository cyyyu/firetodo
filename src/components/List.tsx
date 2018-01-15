import * as React from 'react'
import { observer } from 'mobx-react'
import { css } from 'glamor'

const style_List = css({
  margin: '16px auto',
  width: '85%',
  maxWidth: 350,
  height: 'calc(100vh - 180px)',
  overflow: 'auto',
  borderRadius: 4,
  padding: '6px 12px',
  '& ul': {
    display: 'block',
    padding: 0,
    margin: 0,
    '& li': {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      padding: '10px 12px',
      borderRadius: 4,
      background: 'white',
      boxShadow: '0 0 4px gray',
      '&:not(:last-child)': {
        marginBottom: 6
      },
      '& .item-index': {
        fontSize: 12,
        marginRight: 6,
        '&:after': {
          content: '.'
        }
      },
      '& button.item-remove': {
        marginLeft: 'auto',
        fontSize: 18,
        textShadow: '0 0 4px #a9a9a9'
      }
    }
  }
})

const List = observer(props => (
  <div {...style_List}>
    <ul>
      {props.store.list.map((item, index) => (
        <li key={item.id}>
          <span className="item-index">{index + 1}</span>
          {item.text}
          <button
            className="item-remove"
            onClick={() => props.store.removeItem(item.id)}
          >
            &#x2716;
          </button>
        </li>
      ))}
    </ul>
  </div>
))

export default List
