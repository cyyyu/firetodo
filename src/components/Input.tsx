import * as React from 'react'
import { observer, inject } from 'mobx-react'
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

@inject('appStore')
@observer
class Input extends React.Component<{ appStore?: AppStore }> {
  input: HTMLInputElement

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { appStore } = this.props
    if (e.key === 'Enter') {
      appStore.addItem()
      this.input.blur()
    }
  }

  render() {
    const { appStore } = this.props
    return (
      <div {...style_Input}>
        <input
          ref={input => (this.input = input)}
          value={appStore.edittingItem}
          onKeyPress={this.handleKeyPress}
          onChange={appStore.updateEdittingItem}
        />
      </div>
    )
  }
}

export default Input
