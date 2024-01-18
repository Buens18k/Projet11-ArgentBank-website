import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import './App.css';
import { Home } from './pages/home';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,

  },
]);

export default App;