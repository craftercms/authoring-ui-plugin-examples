import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import CrafterCMSNextBridge
  from '@craftercms/studio-ui/components/CrafterCMSNextBridge/CrafterCMSNextBridge';
import AuthBoundary from '@craftercms/studio-ui/components/AuthBoundary/AuthBoundary';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const renderApp = () => {
  root.render(
    <StrictMode>
      <CrafterCMSNextBridge>
        <App />
      </CrafterCMSNextBridge>
    </StrictMode>
  );
};

import.meta.env.DEV
  ? root.render(
    <StrictMode>
      <AuthBoundary>
        <CrafterCMSNextBridge>
          <App />
        </CrafterCMSNextBridge>
      </AuthBoundary>
    </StrictMode>
  ) : renderApp();
