import React from 'react'
import plugin from 'sample-craftercms-plugin'

const App = () => {
  const Component = plugin.widgets['org.craftercms.sampleComponentLibraryPlugin.components.reactComponent']
  return <Component text="John" />
}

export default App
