import Elm from 'react-elm-components'

/*
  // Usage

  import { unmountWithPort, UnmountableElm } from './UnmountableElm.js'
  import Counter from './elm/Counter.js'

  function App () {
    return <UnmountableElm
            src={Counter.Elm.Counter}
            ports={unmountWithPort('unmount')}
            />
  }

*/

var unmountFunctionRefs = {}
export function unmountWithPort (portName, originalHandler) {
  return function (ports) {
    if (originalHandler) originalHandler(ports)
    if (ports && ports[portName]) {
      unmountFunctionRefs[this] = ports[portName].send // `this` refers to the react component instance
    }
  }
}

export class UnmountableElm extends Elm {
  componentWillUnmount () {
    let unmountThis = unmountFunctionRefs[this]
    delete unmountFunctionRefs[this]
    if (unmountThis) unmountThis()
  }
}
