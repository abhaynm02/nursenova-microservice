import React from 'react';
import Lottie from 'react-lottie-player';
import lazyloading from '../assets/Animation - 1720078622136.json';

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
      <div className='w-60 h-60'>
        <Lottie
          animationData={lazyloading}
          loop={true}
          play
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;