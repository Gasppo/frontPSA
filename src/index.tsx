import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoadingIndicatorProvider from './components/Loading/LoadingContextProvider';
import LoadingOverlay from './components/Loading/LoadingOverlay';
import LoadingSkeleton from './components/Loading/LoadingSkeleton';
import LoadingSlider from './components/Loading/LoadingSlider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <StyledEngineProvider injectFirst>
    <LoadingIndicatorProvider
      blocking={LoadingOverlay}
      nonBlocking={LoadingSlider}
      replacing={LoadingSkeleton}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </LoadingIndicatorProvider>
  </StyledEngineProvider>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
