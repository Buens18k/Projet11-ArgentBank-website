import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './Layout/Layout';
import Error404 from './pages/Error404';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <Error404 />,
  },
]);

export default App;