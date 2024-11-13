import React from 'react';

import { Button, Input, Checkbox, theme, Grid, Form, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import backgroundImg from 'common/assets/img/login-bg.png';
import useAuth from 'hooks/useAuth';
import { LoginParams } from 'shared/api/auth/authAPIService.types';
import { useMyInfoStore } from 'shared/store/myInfo/myInfo';
import useUserManagement from 'hooks/useUserManagement';

// type LoginType = 'user' | 'admin';

const { useBreakpoint } = Grid;
const { Title } = Typography;

const LoginView = () => {
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const { login } = useAuth();
  const { getUser } = useUserManagement();

  const { dispatchIsLogin, dispatchMyInfo } = useMyInfoStore();

  // const [loginType, setLoginType] = useState<LoginType>('user');

  const userId = '';
  const password = '';

  const onFinish = async (values: LoginParams) => {
    if (values.remember) {
      localStorage.setItem('userId', values.userId);
      const res = await login({ ...values });
      if (res) {
        dispatchIsLogin(true);
        const myInfo = await getUser(values.userId);
        if (myInfo) dispatchMyInfo(myInfo);
      }
    } else {
      localStorage.removeItem('userId');
    }
  };

  // const handleModeChange = (e: any) => {
  //   setLoginType(e.target.value);
  // };

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
      height: screens.sm ? '100vh' : '100vh'
    },
    text: {
      color: 'white',
      fontSize: '1rem',
      marginTop: '-20px'
    },
    title: {
      fontSize: screens.md ? '3.5rem' : '2.5rem',
      fontWeight: 800,
      color: 'white',
      display: 'flex',
      gap: '1px'
    },
    highlight: {
      color: '#aed5ff',
      whiteSpace: 'nowrap'
    },
    loginBox: {
      backgroundColor: '#22364D',
      padding: '30px 20px',
      borderRadius: '10px',
      width: '70%',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center'
    },
    rememberDesc: {
      color: '#8c9fb9',
      marginBottom: '10px'
    },
    loginInnerBox: {
      width: '80%'
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem('userId')) {
  //     setUserId(localStorage.getItem('userId') as string);
  //   } else setUserId('');
  // }, [loginType]);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>
            <span style={styles.highlight}>서울</span>월드컵경기장
          </Title>
          <h6 style={styles.text}>월드컵경기장 잔디 생육 관리 시스템</h6>
        </div>
        <div style={styles.loginBox}>
          <div style={styles.loginInnerBox}>
            {/* <div>
              <Radio.Group
                onChange={handleModeChange}
                value={loginType}
                style={{
                  marginBottom: 25
                }}>
                <Radio.Button value="user">사용자 로그인</Radio.Button>
                <Radio.Button value="admin">관리자 로그인</Radio.Button>
              </Radio.Group>
            </div> */}
            <Form
              initialValues={{
                remember: true,
                userId: localStorage.getItem('userId')
              }}
              onFinish={onFinish}
              layout="vertical"
              requiredMark="optional">
              <h5 className="text-left mb-3 font-weight-bold" style={{ color: '#aed5ff' }}>
                사용자 정보
              </h5>
              <Form.Item
                name="userId"
                rules={[
                  {
                    required: true,
                    message: '아이디를 입력해주세요.'
                  }
                ]}
                style={{ marginBottom: '20px' }}>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="id"
                  value={userId}
                  style={{ backgroundColor: '#16293a', color: 'white' }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요.'
                  }
                ]}
                style={{ marginBottom: '20px' }}>
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  style={{ backgroundColor: '#16293a', color: 'white' }}
                  value={password}
                />
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
      </div>
    </section>
  );
};

export default LoginView;
