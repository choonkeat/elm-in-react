import React from 'react'

export default class Elm extends React.Component {
  constructor (props, ref) {
    super(props)
    this.myRef = React.createRef() // to hold rendered dom node
  }

  componentDidMount () {
    // https://github.com/cultureamp/react-elm-components/pull/25
    // The workaround is to create an extra <div>
    var node = this.myRef.current
    var placeholder = document.createElement('div')
    node.appendChild(placeholder)

    this.app = this.props.src.init({
      node: placeholder,
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
