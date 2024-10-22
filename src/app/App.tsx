import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { Routing } from './routing';
import { LoadingProvider } from 'contexts/LoadingContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
} from 'chart.js';

function App() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

  return (
    <>
      <LoadingProvider>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <Routing />
        </ConfigProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
