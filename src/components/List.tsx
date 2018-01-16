import * as React from 'react'
import { observer } from 'mobx-react'
import { css, keyframes } from 'glamor'
import { AppStore } from '../store'
import * as classnames from 'classnames'

const fadeOut = keyframes('fadeOut', {
  from: {
    transform: 'scale(1)',
    opacity: 1
  },
  to: {
    transform: 'scale(0.8)',
    opacity: 0
  }
})

const style_List = css({
  margin: '16px auto',
  width: '85%',
  maxWidth: 350,
  padding: '6px 4px',
  '& h3': {
    color: '#ddd',
    fontSize: 14,
    textShadow: '0 0 4px #222',
    textIndent: '8px'
  },
  '& ul': {
    display: 'block',
    padding: 0,
    margin: 0,
    height: 'calc(100vh - 220px)',
    overflow: 'auto',
    borderRadius: 4,
    padding: '0 8px',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      padding: '14px 12px',
      borderRadius: 4,
      background: 'white',
      boxShadow: '0 0 4px gray',
      '& *': {
        transition: 'all .2s'
      },
      '&.fade-out': {
        animation: `${fadeOut} .15s forwards`
      },
      '&:not(:last-child)': {
        marginBottom: 6
      },
      '& .item-toggle': {
        display: 'block',
        width: 20,
        height: 20,
        borderRadius: '100%',
        fontSize: 12,
        marginRight: 6,
        border: '1px solid #ccc',
        '&:after': {
          content: '✔',
          fontSize: 20,
          lineHeight: '20px',
          opacity: 0
        }
      },
      '& .item-remove': {
        marginLeft: 'auto',
        fontSize: 14,
        color: '#8e8e8e'
      },

      // finished item
      '&.finished': {
        '& .item-text': {
          textDecoration: 'line-through',
          textDecorationColor: 'black',
          color: '#ddd'
        },
        '& .item-toggle': {
          borderColor: '#d4d4d4',
          '&:after': {
            opacity: 1
          }
        }
      }
    }
  }
})

@observer
class List extends React.Component<
  { store: AppStore },
  {
    animatings: {
      [id: string]: boolean
    }
  }
> {
  state = {
    animatings: {}
  }

  addForAnimatingOut = id => () => {
    const { store } = this.props
    this.setState(
      state => {
        const animatings = { ...state.animatings }
        animatings[id] = true
        return { animatings }
      },
      () => {
        // remove from db by the end of animation
        setTimeout(() => {
          store.removeItem(id)
        }, 200)
      }
    )
  }

  render() {
    const { store } = this.props
    return (
      <div {...style_List}>
        <h3>All</h3>
        <ul>
          {store.list.map((item, index) => (
            <li
              key={item.id}
              className={classnames({
                'fade-out': !!this.state.animatings[item.id],
                finished: !!item.status
              })}
            >
              <span
                onClick={() => store.toggleItem(item.id, item.status)}
                className="item-toggle"
              />
              <span className="item-text">{item.text}</span>
              <a
                className="item-remove"
                onClick={this.addForAnimatingOut(item.id)}
              >
                ☓
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
