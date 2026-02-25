import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/fonts.css';
import './app/styles/global.css';
import { PageLoader } from './shared/ui/PageLoader';

const App = lazy(() => import('./app/App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
