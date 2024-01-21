import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import SignIn from './pages/Sign-in';
import User from './pages/User';

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
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
]);

export default App;
