import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error404 />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default App;
