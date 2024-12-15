import React from 'react'

const AnimatedButton = ({ genreName, genderNameSize, specialStyle }) => {
  return (
    <button
      className={`
        relative z-0 flex items-center justify-center overflow-hidden rounded-lg gap-3 border-[1px] 
        border-neutral-700 px-3 py-2 font-semibold text-xs uppercase  transition-all duration-500
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-neutral-300
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:scale-105 hover:text-neutral-900
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95`}
      style={specialStyle }
    >

      <span className={genderNameSize}>{genreName}</span>
    </button>
  );
};

export default AnimatedButton;