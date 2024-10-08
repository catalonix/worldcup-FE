import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppPaths } from './app-routing';
import Layout from '../layout/DefaultLayout';
// import Login from '@pages/Login/index';
import Login from 'pages/Login/index';
import Monitoring from 'pages/Monitoring';
import NdviSummary from 'pages/MonitoringEquipment/NdviSummary';
import NdviDetail from 'pages/MonitoringEquipment/NdviDetail';
import SoilSummary from 'pages/MonitoringEquipment/SoilSummary';
import SoilDetail from 'pages/MonitoringEquipment/SoilDetail';
import WeatherSummary from 'pages/MonitoringEquipment/WeatherSummary';
import WeatherDetail from 'pages/MonitoringEquipment/WeatherDetail';

export function Routing() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path={AppPaths.LOGIN} element={<Login />} />
          <Route element={<Layout />}>
            <Route path={AppPaths.HOME} element={<Monitoring />} />
            <Route path={AppPaths.MONITORING_EQUIPMENT} element={<Monitoring />}></Route>
            <Route path={AppPaths.NDVI_SUMMARY} element={<NdviSummary />}></Route>
            <Route path={AppPaths.NDVI_DETAIL} element={<NdviDetail />}></Route>
            <Route path={AppPaths.NDVI_SUMMARY} element={<NdviSummary />}></Route>
            <Route path={AppPaths.SOIL_SUMMARY} element={<SoilSummary />}></Route>
            <Route path={AppPaths.SOIL_DETAIL} element={<SoilDetail />}></Route>
            <Route path={AppPaths.WEATHER_SUMMARY} element={<WeatherSummary />}></Route>
            <Route path={AppPaths.WEATHER_DETAIL} element={<WeatherDetail />}></Route>
          </Route>
        </Routes>
        {/* <SnackbarBase /> */}
      </BrowserRouter>
    </div>
  );
}

export default Routing;
