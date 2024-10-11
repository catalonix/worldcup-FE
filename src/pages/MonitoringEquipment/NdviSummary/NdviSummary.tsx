import React from 'react';
import NdviCameraContainer from 'components/ndviSummary/NdviCameraContainer';
import NdviInfoContainer from 'components/ndviSummary/NdviInfoContainer';
import NdviLiveCameraContainer from 'components/ndviSummary/NdviLiveCameraContainer';

const NdviSummary = () => {
  return (
    <div>
      <NdviCameraContainer />
      <NdviInfoContainer />
      <NdviLiveCameraContainer />
    </div>
  );
};
export default NdviSummary;
