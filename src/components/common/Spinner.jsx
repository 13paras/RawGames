import React from "react";

const Spinner = () => {
  return (
    <div
      className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50
    '
    >
      <span className='loading loading-infinity loading-lg'></span>
    </div>
  );
};

export default Spinner;
