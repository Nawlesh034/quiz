import React, { useState } from 'react';
import Questions from '../QuestionSeries/Questions';

function Hero() {
  const [navigate, setNavigation] = useState(false);

  const handleClick = () => {
    setNavigation(true);
  };

  if (navigate) {
    return <Questions />;
  }

  return (
    <div className='flex flex-col justify-center items-center mt-20 w-full px-4 sm:px-6 md:px-8 lg:px-0'>
      <div className='flex flex-col gap-16 max-w-[627px] w-full'>
        {/* Logo */}
        <div className='flex justify-center'>
          <svg width="73" height="72" viewBox="0 0 73 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1054)">
              <path d="M9.5 30H42.5V36H9.5V30ZM9.5 24H42.5V18H9.5V24ZM9.5 48H30.5V42H9.5V48ZM54.53 38.61L56.66 36.48C57.83 35.31 59.72 35.31 60.89 36.48L63.02 38.61C64.19 39.78 64.19 41.67 63.02 42.84L60.89 44.97L54.53 38.61ZM52.4 40.74L36.5 56.64V63H42.86L58.76 47.1L52.4 40.74Z" fill="#7C8181" />
            </g>
            <defs>
              <clipPath id="clip0_1_1054">
                <rect width="72" height="72" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Title and Description */}
        <div className='flex flex-col justify-center items-center text-center px-2'>
          <h3 className='font-semibold text-xl'>Sentence Construction</h3>
          <p className='font-normal text-[#7C8181]'>
            Select the correct words to complete the sentence by arranging the provided options in the right order.
          </p>
        </div>

        {/* Info Section */}
        <div className='flex flex-wrap justify-between gap-y-6 text-center font-medium w-full'>
          <div className='flex flex-col w-1/3 min-w-[100px]'>
            <span className='text-xl'>Time Per Question</span>
            <span className='text-[#414343]'>30 sec</span>
          </div>
          <div className='flex flex-col w-1/3 min-w-[100px]'>
            <span className='text-xl'>Total Questions</span>
            <span className='text-[#414343]'>10</span>
          </div>
          <div className='flex flex-col w-1/3 min-w-[100px]'>
            <span className='text-xl'>Coins</span>
            <div className='text-[#414343] flex justify-center items-center gap-1'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" fill="#FFD700" stroke="#F5CE00" strokeWidth="2" />
              </svg>
              0
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='mt-12'>
        <div className='flex flex-wrap justify-center gap-4 font-medium text-center'>
          <button className='border rounded-lg px-6 border-[#453FE1] text-[#453FE1] h-10 w-36'>
            Back
          </button>
          <button
            className='border rounded-lg px-6 bg-[#453FE1] text-white h-10 w-36'
            onClick={handleClick}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
