import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { Routing } from './routing';

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Routing />
      </ConfigProvider>
    </>
  );
}

export default App;
