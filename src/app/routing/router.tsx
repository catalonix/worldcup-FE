import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppPaths } from './app-routing';
import Layout from '../layout/DefaultLayout';
import Login from 'pages/Login';
import Monitoring from 'pages/Monitoring';
import NdviSummary from 'pages/MonitoringEquipment/NdviSummary';
import NdviDetail from 'pages/MonitoringEquipment/NdviDetail';
import SoilSummary from 'pages/MonitoringEquipment/SoilSummary';
import SoilDetail from 'pages/MonitoringEquipment/SoilDetail';
import WeatherSummary from 'pages/MonitoringEquipment/WeatherSummary';
import WeatherDetail from 'pages/MonitoringEquipment/WeatherDetail';
import Observation from 'pages/Observation';
import RemoteOperation from 'pages/RemoteOperation';
import UserManagement from 'pages/UserManagement';
import MyPage from 'pages/MyPage';
import { useMyInfoStore } from 'shared/store/myInfo/myInfo';
import ProtectedRoute from './protectedRoute';
import Calendar from 'pages/Calendar';
import MonitoringEquipment from 'pages/MonitoringEquipment/MonitoringEquipment';

export function Routing() {
  const { isLogin } = useMyInfoStore();
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path={AppPaths.LOGIN} element={<Login />} />
          <Route element={<Layout />}>
            <Route path={AppPaths.HOME} element={<ProtectedRoute element={<Monitoring />} isLoggedIn={isLogin} />} />
            <Route path={AppPaths.MYPAGE} element={<ProtectedRoute element={<MyPage />} isLoggedIn={isLogin} />} />
            <Route
              path={AppPaths.MONITORING_EQUIPMENT}
              element={<ProtectedRoute element={<MonitoringEquipment />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.NDVI_SUMMARY}
              element={<ProtectedRoute element={<NdviSummary />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.NDVI_DETAIL}
              element={<ProtectedRoute element={<NdviDetail />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.SOIL_SUMMARY}
              element={<ProtectedRoute element={<SoilSummary />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.SOIL_DETAIL}
              element={<ProtectedRoute element={<SoilDetail />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.WEATHER_SUMMARY}
              element={<ProtectedRoute element={<WeatherSummary />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.WEATHER_DETAIL}
              element={<ProtectedRoute element={<WeatherDetail />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.OBSERVATION}
              element={<ProtectedRoute element={<Observation />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.REMOTE_OPERATION}
              element={<ProtectedRoute element={<RemoteOperation />} isLoggedIn={isLogin} />}
            />
            <Route
              path={AppPaths.USER_MANAGEMENT}
              element={<ProtectedRoute element={<UserManagement />} isLoggedIn={isLogin} />}
            />
            <Route path={AppPaths.CALENDAR} element={<ProtectedRoute element={<Calendar />} isLoggedIn={isLogin} />} />
          </Route>
        </Routes>
        {/* <SnackbarBase /> */}
      </BrowserRouter>
    </div>
  );
}

export default Routing;
