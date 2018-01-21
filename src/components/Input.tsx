import * as React from 'react'
import { observer } from 'mobx-react'
import { css, style } from 'glamor'
import { AppStore } from '../store'

const style_Input = css({
  margin: '0 auto',
  width: '100%',
  maxWidth: 800,
  overflow: 'auto',
  padding: '6px 0px',
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
  }
})

@observer
class Input extends React.Component<{ store: AppStore }> {
  handleKeyPress = (e: React.FormEvent<any>) => {
    const { store } = this.props
    if (e.key === 'Enter') {
      store.addItem()
    }
  }

  render() {
    const { store } = this.props
    return (
      <div {...style_Input}>
        <input
          value={store.edittingItem}
          onKeyPress={this.handleKeyPress}
          onChange={store.updateEdittingItem}
        />
      </div>
    )
  }
}

export default Input
