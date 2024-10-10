import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppPaths } from './app-routing';
import Layout from '../layout/DefaultLayout';
import Login from 'pages/Login/index';
import Monitoring from 'pages/Monitoring';
import NdviSummary from 'pages/MonitoringEquipment/NdviSummary';
import NdviDetail from 'pages/MonitoringEquipment/NdviDetail';
import SoilSummary from 'pages/MonitoringEquipment/SoilSummary';
import SoilDetail from 'pages/MonitoringEquipment/SoilDetail';
import WeatherSummary from 'pages/MonitoringEquipment/WeatherSummary';
import WeatherDetail from 'pages/MonitoringEquipment/WeatherDetail';
import Observation from 'pages/Observation';
import RemoteOperation from 'pages/RemoteOperation';
import UserManagment from 'pages/UserManagement';

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
            <Route path={AppPaths.OBSERVATION} element={<Observation />}></Route>
            <Route path={AppPaths.REMOTE_OPERATION} element={<RemoteOperation />}></Route>
            <Route path={AppPaths.USER_MANAGEMENT} element={<UserManagment />}></Route>
          </Route>
        </Routes>
        {/* <SnackbarBase /> */}
      </BrowserRouter>
    </div>
  );
}

export default Routing;
