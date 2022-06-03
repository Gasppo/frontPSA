import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingIndicatorProvider from './components/Loading/LoadingContextProvider';
import LoadingOverlay from './components/Loading/LoadingOverlay';
import LoadingSkeleton from './components/Loading/LoadingSkeleton';
import LoadingSlider from './components/Loading/LoadingSlider';
import './index.css';
import Home from './pages';
import PlaceHolderSite from './pages/placeholder';
import Soporte from './pages/soporte';
import Tickets from './pages/soporte/tickets';
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="soporte" element={<Soporte />} />
            <Route path='soporte/tickets' element={<Tickets />} />
            <Route path="placeholder" element={<PlaceHolderSite />} />
            <Route path="contacts" element={<PlaceHolderSite />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </LoadingIndicatorProvider>
  </StyledEngineProvider>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
