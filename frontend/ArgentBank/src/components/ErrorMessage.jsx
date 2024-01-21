import React from 'react';
import { isRouteErrorResponse } from 'react-router-dom';

import Main from './Main';

export default function ErrorMessage({ error }) {
  if (isRouteErrorResponse(error)) {
    return (
      <Main>
        <div>
          <h1>{error.status}</h1>
          <p>The request page does not exist</p>
        </div>
      </Main>
    );
  }
}
