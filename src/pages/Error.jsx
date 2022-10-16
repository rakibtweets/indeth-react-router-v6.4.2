import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const Error = () => {
  const error = useRouteError();
  return (
    <>
      <MainNavigation />
      <h1>{error.message}</h1>
      <h2>Error code: {error.status}</h2>
    </>
  );
};

export default Error;
