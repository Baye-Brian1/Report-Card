import React from "react";

const Card = ({ icon, title, text }) => {
  return (
    <div className="border border-white p-6 rounded-xs bg-white backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="inline-flex mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center 
                      bg-blue-600/12 shadow-xs"
        >
          <div className="z-10 text-blue-600 text-2xl">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-lg  text-[#0F172A] mb-1">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{text}</p>
    </div>
  );
};

export default Card;
