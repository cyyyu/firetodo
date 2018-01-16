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
      '&.fade-out': {
        animation: `${fadeOut} .15s forwards`,
      },
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

@observer
class List extends React.Component<{ store: AppStore }, {
  animatings: {
    [id: string]: boolean
  }
}> {
  state = {
    animatings: {}
  }

  addForAnimatingOut = (id) => () => {
    const { store } = this.props
    this.setState((state) => {
      const animatings = { ...state.animatings }
      animatings[id] = true
      return { animatings }
    }, () => {
      // remove from db by the end of animation
      setTimeout(() => {
        store.removeItem(id)
      }, 200)
    })
  }

  render() {
    const { store } = this.props
    return (
      <div {...style_List}>
        <ul>
          {store.list.map((item, index) => (
            <li key={item.id} className={classnames({ 'fade-out': !!this.state.animatings[item.id] })}>
              <span className="item-index">{index + 1}</span>
              {item.text}
              <button
                className="item-remove"
                onClick={this.addForAnimatingOut(item.id)}
              >
                &#x2716;
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
