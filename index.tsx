import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '@layouts/App';
import { GlobalStyle } from '@styles/globalStyle';

render(
  <BrowserRouter>
    <App/>
    <GlobalStyle/>
  </BrowserRouter>
  , 
  document.querySelector('#app')
);