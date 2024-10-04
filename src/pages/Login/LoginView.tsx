import { Button, Input, Space, Radio, Checkbox, theme, Grid, Form, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import backgroundImg from 'common/assets/img/login-bg.png';

type LoginType = 'phone' | 'account';

const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const LoginView = () => {
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const [loginType, setLoginType] = useState('user');
  const [userId, setUserId] = useState('');

  const onFinish = (values: any) => {
    if (values.remember) {
      localStorage.setItem('userId', values.userId);
    } else {
      localStorage.removeItem('userId');
    }
    console.log('Received values of form: ', values);
  };

  const handleModeChange = (e: any) => {
    setLoginType(e.target.value);
  };

  const styles = {
    container: {
      margin: '0 auto',
      width: '60%'
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%'
    },
    forgotPassword: {
      float: 'right'
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      backgroundImage: `url(${backgroundImg})`, // 배경 이미지 추가
      backgroundSize: 'cover', // 이미지 크기를 섹션에 맞추기
      backgroundPosition: 'center', // 이미지 위치 조정
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto'
    },
    text: {
      color: 'white'
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      fontWeight: 800,
      color: 'white',
      display: 'flex',
      gap: '1px'
    },
    highlight: {
      color: '#aed5ff'
    },
    loginBox: {
      backgroundColor: '#3a587a',
      padding: '20px',
      borderRadius: '10px'
    },
    rememberDesc: {
      color: '#8c9fb9'
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUserId(localStorage.getItem('userId') as string);
    } else setUserId('');
  }, [loginType]);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>
            <div style={styles.highlight}>서울</div>월드컵경기장
          </Title>
          <Text style={styles.text}>월드컵경기장 잔디 생육 관리 시스템</Text>
        </div>
        <div style={styles.loginBox}>
          <div>
            <Radio.Group
              onChange={handleModeChange}
              value={loginType}
              style={{
                marginBottom: 25
              }}>
              <Radio.Button value="user">사용자 로그인</Radio.Button>
              <Radio.Button value="admin">관리자 로그인</Radio.Button>
            </Radio.Group>
          </div>
          <Form
            initialValues={{
              remember: true,
              userId: localStorage.getItem('userId')
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional">
            <Form.Item
              name="userId"
              rules={[
                {
                  required: true,
                  message: '아이디를 입력해주세요.'
                }
              ]}>
              <Input prefix={<UserOutlined />} placeholder="id" value={userId} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력해주세요.'
                }
              ]}>
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" style={styles.rememberDesc}>
              <Checkbox style={styles.rememberDesc}>아이디 저장</Checkbox>
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
              <Button block type="primary" htmlType="submit">
                로그인
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LoginView;
