import '../layout/WeatherInfo.scss';

import { CloudOutlined } from '@ant-design/icons';

const WeatherInfo = () => {
  return (
    <div className="weatherContainer">
      <div className="weatherBox">
        <CloudOutlined />
        <span>기온: 19.3</span>
      </div>
      <div className="weatherBox">
        <span>강수량: 19.3</span>
      </div>
      <div className="weatherBox">
        <span>습도: 19.3</span>
      </div>
      <div className="weatherBox">
        <span>풍속: 19.3</span>
        <div className="weatherDirection">북</div>
      </div>
    </div>
  );
};
export default WeatherInfo;
