import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { useRouteError } from 'react-router-dom';

export default function Error404() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <Header />
      <ErrorMessage error={error} />
      <Footer />
    </>
  );
}
