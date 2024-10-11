import React from 'react';

const NdviLiveCameraContainer = () => {
  return (
    <div className="card">
      <div className="card-header">경기장 이미지(촬영일시: 2024-10-11 14:30:52)</div>
      <div className="card-body">
        <img
          id="ndviImg1"
          src="https://seoul.fieldon.io/data13/C001/catalonix_show_daily_img.jpg "
          className="ndvi-img twentytwenty-before"
          width="100%"
        />
      </div>
    </div>
  );
};
export default NdviLiveCameraContainer;
