import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { css, keyframes } from 'glamor'
import { AppStore } from '../store'
import * as classnames from 'classnames'

const Fragment = React.Fragment

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
  margin: '0 auto',
  maxWidth: 800,
  padding: '6px 0px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  '& .tab': {
    marginBottom: 10,
    '& span': {
      display: 'inline-block',
      margin: '0 1px',
      color: '#7BCECC',
      fontSize: 14,
      textIndent: '8px',
      userSelect: 'none',
      '&.active': {
        color: '#3090A1'
      }
    }
  },
  '& ul': {
    display: 'block',
    padding: 0,
    margin: 0,
    borderRadius: 4,
    flexGrow: 1,
    '& li': {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      padding: '16px 12px',
      borderRadius: 4,
      background: 'linear-gradient(white 90%, #ddd)',
      userSelect: 'none',
      color: '#BC5148',
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
      '& .item-text': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexGrow: 1
      },
      '& .item-remove': {
        marginLeft: 6,
        fontSize: 14,
        color: '#8e8e8e',
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover, &:active, &:focus': {
          color: '#BC5148',
          outline: 'none'
        }
      },
      // finished item
      '&.finished': {
        '& .item-text': {
          textDecoration: 'line-through',
          textDecorationColor: '#BC5148',
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

enum ActiveTab {
  all = 'all',
  upcomings = 'upcomings',
  finished = 'finished'
}

@inject('appStore')
@observer
class List extends React.Component<
  { appStore?: AppStore },
  {
    animatings: {
      [id: string]: boolean
    }
    activeTab: ActiveTab
  }
> {
  state = {
    animatings: {},
    activeTab: ActiveTab.all
  }

  addForAnimatingOut = id => () => {
    const { appStore } = this.props
    this.setState(
      state => {
        const animatings = { ...state.animatings }
        animatings[id] = true
        return { animatings }
      },
      () => {
        // remove from db by the end of animation
        setTimeout(() => {
          appStore.removeItem(id)
        }, 200)
      }
    )
  }

  renderItem = (item, index) => (
    <li
      key={item.id}
      className={classnames({
        'fade-out': !!this.state.animatings[item.id],
        finished: !!item.status
      })}
    >
      <span
        onClick={() => this.props.appStore.toggleItem(item.id, item.status)}
        className="item-toggle"
      />
      <span className="item-text">{item.text}</span>
      <button
        className="item-remove"
        onClick={this.addForAnimatingOut(item.id)}
      >
        ☓
      </button>
    </li>
  )

  renderTab = () => {
    const { activeTab } = this.state
    return (
      <div className="tab">
        <span
          onClick={() => this.setState({ activeTab: ActiveTab.all })}
          className={classnames({ active: activeTab === ActiveTab.all })}
        >
          All
        </span>
        <span>/</span>
        <span
          onClick={() => this.setState({ activeTab: ActiveTab.upcomings })}
          className={classnames({ active: activeTab === ActiveTab.upcomings })}
        >
          Upcomings
        </span>
        <span>/</span>
        <span
          onClick={() => this.setState({ activeTab: ActiveTab.finished })}
          className={classnames({ active: activeTab === ActiveTab.finished })}
        >
          Finished
        </span>
      </div>
    )
  }

  renderList = () => {
    const { appStore } = this.props
    const { activeTab } = this.state
    switch (activeTab) {
      case 'all': {
        return <ul>{appStore.list.map(this.renderItem)}</ul>
      }
      case 'upcomings': {
        return <ul>{appStore.upcomingsList.map(this.renderItem)}</ul>
      }
      case 'finished': {
        return <ul>{appStore.finishedList.map(this.renderItem)}</ul>
      }
    }
  }

  render() {
    return (
      <div {...style_List}>
        {this.renderTab()}
        {this.renderList()}
      </div>
    )
  }
}

export default List
