import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  FileOutlined,
  UserOutlined,
  CopyOutlined,
  StockOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Tag, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import WeatherInfo from 'components/layout/WeatherInfo';
import Breadcrumb from 'components/layout/Breadcrumb';
import { AppPaths } from '../routing/app-routing';
import './DefaultLayout.scss';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: <div onClick={() => handleLogout()}>LOGOUT</div>
    }
  ];

  const handleLogout = () => {
    // TODO: LOGOUT 로직 추가
    // TODO: 추후 hooks 로 빼야됨
    localStorage.removeItem('userId');
    navigate(AppPaths.LOGIN);
  };

  const handleClickMenu = (menu: string) => {
    navigate(`${menu}`);
  };

  useEffect(() => {
    const path = location.pathname;
    setSelectedKeys([path.slice(1)]);
  }, [location.pathname]);

  return (
    <Layout style={{ position: 'relative', height: '100vh' }}>
      <Header
        style={{
          padding: '0 20px',
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100,
          position: 'absolute',
          width: '100%',
          top: 0,
          backgroundColor: '#22354e'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="https://seoul.fieldon.io/assets/img/logo-icon.png" alt="logo" />
          {!collapsed && <span style={{ fontSize: '22px', color: 'white', fontWeight: '700' }}>서울월드컵경기장</span>}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '22px',
              width: 64,
              height: 64,
              color: 'white'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div className="weather-tag">
            미세먼지
            <Tag color="blue" style={{ fontSize: '10px' }}>
              좋음
            </Tag>
          </div>
          <div className="weather-tag">
            초미세먼지
            <Tag color="blue" style={{ fontSize: '10px' }}>
              좋음
            </Tag>
          </div>
          <WeatherInfo />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
              <Avatar icon={<UserOutlined />} />
              <div>user name</div>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ top: '60px', paddingTop: '20px' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          selectedKeys={selectedKeys}
          items={[
            {
              key: AppPaths.HOME,
              icon: <AppstoreOutlined />,
              label: '통합모니터링 요약(그라운드)',
              onClick: () => handleClickMenu(AppPaths.HOME)
            },
            {
              key: AppPaths.MONITORING_EQUIPMENT,
              icon: <FileOutlined />,
              label: '잔디생육 데이터',
              children: [
                {
                  key: AppPaths.NDVI_SUMMARY,
                  label: '식생지수 정보',
                  onClick: () => handleClickMenu(AppPaths.NDVI_SUMMARY)
                },
                {
                  key: AppPaths.NDVI_DETAIL,
                  label: '식생지수 정보 상세',
                  onClick: () => handleClickMenu(AppPaths.NDVI_DETAIL)
                },
                {
                  key: AppPaths.SOIL_SUMMARY,
                  label: '토양관측정보',
                  onClick: () => handleClickMenu(AppPaths.SOIL_SUMMARY)
                },
                {
                  key: AppPaths.SOIL_DETAIL,
                  label: '토양관측정보 상세',
                  onClick: () => handleClickMenu(AppPaths.SOIL_DETAIL)
                },
                {
                  key: AppPaths.WEATHER_SUMMARY,
                  label: '기상센서정보 ',
                  onClick: () => handleClickMenu(AppPaths.WEATHER_SUMMARY)
                },
                {
                  key: AppPaths.WEATHER_DETAIL,
                  label: '기상센서정보 상세',
                  onClick: () => handleClickMenu(AppPaths.WEATHER_DETAIL)
                }
              ]
            },
            {
              key: AppPaths.OBSERVATION,
              icon: <StockOutlined />,
              label: '관측상세 정보',
              onClick: () => handleClickMenu(AppPaths.OBSERVATION)
            },
            {
              key: AppPaths.REMOTE_OPERATION,
              icon: <CopyOutlined />,
              label: '원격작동 정보',
              onClick: () => handleClickMenu(AppPaths.REMOTE_OPERATION)
            },
            {
              key: AppPaths.USER_MANAGEMENT,
              icon: <UserOutlined />,
              label: '사용자 관리',
              onClick: () => handleClickMenu(AppPaths.USER_MANAGEMENT)
            }
          ]}
        />
      </Sider>
      <Layout style={{ background: '#182535' }}>
        <Content
          style={{
            margin: '80px 16px'
          }}>
          <Breadcrumb />
          <Content
            style={{
              marginTop: '10px',
              borderRadius: borderRadiusLG,
              minHeight: 280
            }}>
            <Outlet />
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
