import React from "react";

const Card = ({ icon, title, text }) => {
  return (
    <div className="border border-white/80 px-5 py-6 text-center sm:px-6 rounded-[4px] bg-white backdrop-blur-sm shadow-sm hover:shadow-2xl transition-all duration-300">
      <div className="inline-flex mb-4">
        <div
          className="w-16 h-16 rounded-full bg-accent flex items-center justify-center 
                      bg-blue-600/12 shadow-xs"
        >
          <div className="z-10 text-blue-600 text-2xl">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-[1.45rem] sm:text-[1.65rem] tracking-[-0.03em] text-[#0F172A] mb-1">{title}</h3>
      <p className="mx-auto mt-2 max-w-[18rem] text-[1.03rem] text-base text-[#64748B] leading-[1.35]">{text}</p>
    </div>
  );
};

export default Card;
