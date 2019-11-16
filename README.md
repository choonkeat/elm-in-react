# Embed Elm app in React

Compile our Elm app into Javascript

```
elm make src/Counter.elm --output=src/Counter.js
```

Import a `Elm` react component and our `Counter` javascript object

``` javascript
import Elm from './Elm.js'          // wrapper component that React renders
import Counter from './Counter.js'  // our Elm app, passed to `Elm` component as `app` prop
```

Use `Elm` react component to render our `Counter` app

``` jsx
render() {
  <Elm app={Counter.Elm.Counter} flags={{ count: 123 }} />  
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
