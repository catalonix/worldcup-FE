import { AppPaths } from './app-routing';

const breadcrumbNameMap: Record<AppPaths, string> = {
  [AppPaths.HOME]: '통합모니터링 요약(그라운드)',
  [AppPaths.LOGIN]: '로그인',
  [AppPaths.MYPAGE]: '마이페이지',
  [AppPaths.MONITORING_EQUIPMENT]: '모니터링 장비',
  [AppPaths.NDVI_SUMMARY]: '식생지수 정보',
  [AppPaths.NDVI_DETAIL]: '식생지수 정보 상세',
  [AppPaths.SOIL_SUMMARY]: '토양관측정보',
  [AppPaths.SOIL_DETAIL]: '토양관측정보 상세',
  [AppPaths.WEATHER_SUMMARY]: '기상센서정보',
  [AppPaths.WEATHER_DETAIL]: '기상센서정보 상세',
  [AppPaths.OBSERVATION]: '관측 상세 정보',
  [AppPaths.REMOTE_OPERATION]: '원격작동 정보',
  [AppPaths.USER_MANAGEMENT]: '사용자 관리',
  [AppPaths.ALL_PATHS]: '모든 경로'
};

export default breadcrumbNameMap;
