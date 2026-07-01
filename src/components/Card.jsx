import React from "react";

const Card=({icon,title, text})=>{
    return(
        <div className="border border-[#2563EB]/20 p-6 rounded-2xl bg-white/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
      
      <div className="relative inline-flex mb-4">

        <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center 
                      bg-gradient-to-br from-blue-400/30 to-blue-600/30 
                      backdrop-blur-md border border-white/40 
                      shadow-[0_8px_32px_rgba(37,99,235,0.2)]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
          <div className="relative z-10 text-white text-2xl">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-lg text-[#0F172A] mb-1">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{text}</p>
     </div>

    )
}

export default Card;