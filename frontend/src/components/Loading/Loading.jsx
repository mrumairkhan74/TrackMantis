import React from 'react';
import { GiPrayingMantis } from 'react-icons/gi';

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="relative w-20 h-20">
        {/* Rotating circle */}
        <div className="absolute inset-0 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Mantis icon centered inside */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GiPrayingMantis className="text-slate-500 text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
