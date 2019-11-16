# Embed Elm app in React

### Running this

```
yarn build-elm
yarn start
```

### Description

Compile our Elm app into Javascript (or `yarn build-elm`)

```
elm make src/Counter.elm --output=src/elm/Counter.js
```

Use the `Elm` react wrapper to render our `Counter` javascript object

``` javascript
import React from 'react'
import Elm from './Elm.js'              // wrapper component that React renders
import Counter from './elm/Counter.js'  // our Elm app, passed to `Elm` component as `app` prop

function App () {
  return (
    <Elm app={Counter.Elm.Counter} flags={{ count: 123 }} />
  )
}
```

# Caveat

`elm make` produces javascript that offends `react-scripts` default eslint rules. so we'll have to override it by setting environment variable

```
EXTEND_ESLINT=true
```

and updating package.json

``` json
"eslintConfig": {
  "extends": "react-app",
  "rules": {
    "no-unused-expressions": "off",
    "no-restricted-globals": "off"
  }
},
```

See the commit changes to `package.json` for more information
