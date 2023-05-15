import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReviewApp } from './layouts/ReviewApp';
import { purpleTheme } from './theme';

import './theme/fonts.js';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={purpleTheme}>
        <CssBaseline />
        <ReviewApp />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
