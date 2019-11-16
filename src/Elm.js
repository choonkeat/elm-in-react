import React from 'react'

export default class Elm extends React.Component {
  constructor (props, ref) {
    super(props)
    this.myRef = React.createRef() // to hold rendered dom node
  }

  componentDidMount () {
    this.app = this.props.app.init({
      node: this.myRef.current,
      flags: this.props.flags
    })
  }

  componentWillUnmount () {
    if (this.app && this.app.ports) {
      this.app.ports.unmount.send(null)
      // port unmount : (Json.Encode.Value -> msg) -> Sub msg
    }
    this.app = null
  }

  shouldComponentUpdate () {
    return false // needed?
  }

  render () {
    return <div ref={this.myRef} />
  }
}
