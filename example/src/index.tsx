import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactIntl from 'react-intl'
import { IntlProvider } from 'react-intl'
import * as MaterialUI from '@mui/material'
import createEmotion from '@emotion/css/create-instance'
// import { CrafterCMSGlobal } from '@craftercms/studio-ui'

declare global {
  interface Window {
    // craftercms: CrafterCMSGlobal;
    craftercms: any
  }
}

// Using "App" as a lazily loaded component avoids it being bundled before
// the `window.craftercms` declaration that it needs due to the imports getting
// transformed to vars.
const App = React.lazy(() => import('./App'))

// @ts-ignore
window.craftercms = {
  getStore() {
    return {
      getState() {
        return {
          user: {
            username: 'John Doe'
          }
        }
      }
    }
  },
  getIntl() {
    return {
      formatMessage(descriptor) {
        return descriptor.defaultMessage
      }
    }
  },
  libs: {
    React,
    ReactDOM,
    ReactIntl,
    MaterialUI,
    createEmotion
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
