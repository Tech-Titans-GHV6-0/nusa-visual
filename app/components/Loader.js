// components/Loader.js
import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute top-[60px] left-0 w-12 h-[5px] bg-[#433D3D] opacity-50 rounded-full animate-[shadow_0.5s_linear_infinite]"></div>
        <div className="absolute w-full h-full bg-[#B49C78] rounded animate-[jump_0.5s_linear_infinite]"></div>
      </div>
      <style jsx global>{`
        @keyframes jump {
          15% {
            border-bottom-right-radius: 3px;
          }
          25% {
            transform: translateY(9px) rotate(22.5deg);
          }
          50% {
            transform: translateY(18px) scale(1, 0.9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% {
            transform: translateY(9px) rotate(67.5deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }
        @keyframes shadow {
          0%, 100% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1.2, 1);
          }
        }
      `}</style>
    </div>
  );
}