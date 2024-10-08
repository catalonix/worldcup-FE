import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Tag, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          LOGOUT
        </a>
      )
    }
  ];

  return (
    <Layout style={{ position: 'relative', height: '100vh' }}>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100,
          position: 'absolute',
          width: '100%',
          top: 0
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>LOGO</div>
          <div>서울 월드컵 경기장</div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '10px' }}>
            미세먼지
            <Tag color="blue" style={{ fontSize: '10px' }}>
              좋음{' '}
            </Tag>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '10px' }}>
            초미세먼지
            <Tag color="blue" style={{ fontSize: '10px' }}>
              좋음
            </Tag>
          </div>
          <div>기온 강수량 습도</div>
        </div>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Avatar icon={<UserOutlined />} />
            <div>user name</div>
          </div>
        </Dropdown>
      </Header>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ top: '70px' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '통합모니터링 요약(그라운드)'
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2'
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
