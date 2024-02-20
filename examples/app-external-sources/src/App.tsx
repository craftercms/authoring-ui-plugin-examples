import './App.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useActiveUser from '@craftercms/studio-ui/hooks/useActiveUser';
import useActiveSite from '@craftercms/studio-ui/hooks/useActiveSite';
import CrafterCMSIcon from '@craftercms/studio-ui/icons/CrafterCMSIcon';
import Button from '@mui/material/Button';
import useSiteList from '@craftercms/studio-ui/hooks/useSiteList';

function App() {
  const [count, setCount] = useState(0)
  const { username } = useActiveUser()
  const { name: project } = useActiveSite() ?? {}
  const sites = useSiteList() ?? []

  return (
    <div className="vite-app-root">
      <div className="logos">
        <a href="https://react.dev" target="_blank">
          <CrafterCMSIcon className="logo craftercms" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>CrafterCMS + Vite + React</h1>
      <p>Your username is <code>{username}</code></p>
      <p>{project ? <>Your active project is <code>{project}</code></> : <>No active Project selected.</>}</p>
      <p>You have access to the following projects: {sites.map(site => site.name).join(', ')}</p>
      <div className="card">
        <Button variant="outlined" onClick={() => setCount((count) => count + 1)}>Count is {count}</Button>
        <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
      </div>
    </div>
  )
}

export default App
