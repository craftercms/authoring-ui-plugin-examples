import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactIntl from 'react-intl'
import { IntlProvider } from 'react-intl'
import * as MaterialUI from '@material-ui/core'

// Using "App" as a lazily loaded component avoids it being bundled before
// the `window.craftercms` declaration that it needs due to the imports getting
// transformed to vars.
const App = React.lazy(() => import('./App'))

// @ts-ignore
window.craftercms = {
  libs: {
    React,
    ReactDOM,
    ReactIntl,
    MaterialUI
  }
}

ReactDOM.render(
  <React.Suspense fallback="">
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </React.Suspense>,
  document.getElementById('root')
)
