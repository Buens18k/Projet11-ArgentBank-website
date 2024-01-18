import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './Layout/Layout';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,

  },
]);

export default App;