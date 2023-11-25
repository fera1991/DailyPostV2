import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <img src="https://usagif.com/wp-content/uploads/loading-25.gif" alt="Loading" className="w-16 h-16" />
    </div>
  );
};

export default LoadingOverlay;