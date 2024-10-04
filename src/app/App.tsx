import React from 'react';
import { ConfigProvider } from 'antd';
import { Routing } from './routing';
import { theme } from 'common/styles/theme';

function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <Routing />
      </ConfigProvider>
    </>
  );
}

export default App;
