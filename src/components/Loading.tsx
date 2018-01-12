import * as React from 'react'
import { css, keyframes } from 'glamor'

const style_LoadingAnimation = keyframes('loading', {
  '0%': {
    transform: 'scale(1)',
    background: 'white'
  },
  '50%': {
    transform: 'scale(0.5)',
    background: 'black'
  },
  '100%': {
    transform: 'scale(1)',
    background: 'white'
  }
})

const style_Loading = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '& span': {
    display: 'inline-block',
    height: 10,
    width: 10,
    border: '1px solid black',
    animation: `${style_LoadingAnimation} 1s infinite`,
    margin: '0 4px',
    '&:nth-child(1n)': {
      animationDelay: '0.1s'
    },
    '&:nth-child(2n)': {
      animationDelay: '0.3s'
    },
    '&:nth-child(3n)': {
      animationDelay: '0.5s'
    }
  }
})

const Loading = () => (
  <div {...style_Loading}>
    <span />
    <span />
    <span />
  </div>
)

export default Loading
