import React from 'react';

const NdviInfoContainer = () => {
  return (
    <div className="info-container">
      <div className="info-box">
        <div className="card">
          <div className="card-header">지수 변화</div>
          <div className="card-body">차트</div>
        </div>
      </div>
      <div className="info-box">
        <div className="card">
          <div className="card-header">NDVI 이미지</div>
          <div className="card-body">차트</div>
        </div>
      </div>
    </div>
  );
};
export default NdviInfoContainer;
