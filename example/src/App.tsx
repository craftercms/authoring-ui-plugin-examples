import React, { useEffect, useRef } from 'react'
import { ReactComponent, NonReactComponent } from 'sample-craftercms-plugin'

const App = () => {
  const nonReactRef = useRef(null)
  useEffect(() => {
    NonReactComponent.main({
      craftercms: window.craftercms,
      configuration: { fontColor: 'red' },
      element: nonReactRef.current
    })
  }, [])
  return (
    <>
      <ReactComponent text="John" />
      <div ref={nonReactRef} />
    </>
  )
}

export default App
