import React from 'react'
import logo from './logo.svg'
import './App.css'

import { unmountWithPort, UnmountableElm } from './UnmountableElm.js'
import Elm from './Elm.js'
import Counter from './elm/Counter.js'

class Toggle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value1: this.props.value
    }
  }

  render () {
    return (
      <div>
        <button onClick={() => this.setState({ value1: !this.state.value1 })}>
          {this.state.value1
            ? 'Unmount '
            : 'Mount '} UnmountableElm
        </button>
        <div style={{ height: '100px' }}>
          {this.state.value1
            ? <UnmountableElm src={Counter.Elm.Counter} ports={unmountWithPort('unmount')} flags={{ count: (new Date()).getTime() }} />
            : null}
        </div>
        <button onClick={() => this.setState({ value2: !this.state.value2 })}>
          {this.state.value2
            ? 'Unmount '
            : 'Mount '} Elm
        </button>
        <div style={{ height: '100px' }}>
          {this.state.value2
            ? <Elm src={Counter.Elm.Counter} flags={{ count: (new Date()).getTime() }} />
            : null}
        </div>
      </div>
    )
  }
}

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Toggle value={false} />
        <p>
          Edit <code>src/App.js</code> and save to reload!
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
