import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppPaths } from './app-routing';
import Layout from '../layout/DefaultLayout';
// import Login from '@pages/Login/index';
import Login from 'pages/Login/index';
import Monitoring from 'pages/Monitoring';

export function Routing() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path={AppPaths.LOGIN} element={<Login />} />
          <Route element={<Layout />}>
            <Route path={AppPaths.HOME} element={<Monitoring />} />
          </Route>
        </Routes>
        {/* <SnackbarBase /> */}
      </BrowserRouter>
    </div>
  );
}

export default Routing;
