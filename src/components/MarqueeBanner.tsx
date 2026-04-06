import React from "react";

const MarqueeBanner = () => {
  const text = "We are Maingrace247 tradomedical herbal service. Your number 1 plug for natural wellness...";
  
  return (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden whitespace-nowrap border-y-4 border-accent relative z-20">
      <div className="flex animate-marquee gap-8">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xl md:text-2xl font-serif font-bold italic tracking-wide uppercase px-4 shrink-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
