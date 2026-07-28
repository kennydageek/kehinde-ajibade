import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import InfoPage from './InfoPage.tsx';
import './index.css';

const Page = window.location.pathname.replace(/\/+$/, '') === '/info' ? InfoPage : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
