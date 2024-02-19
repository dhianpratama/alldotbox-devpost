"use client"
import React, { useState } from 'react';

interface CustomButtonProps {
    href: string;
    children: React.ReactNode;
    mockData?: { buttonColor: string };
  }

 const CustomBuyButton: React.FC<CustomButtonProps> = ({ href, children , mockData  }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonColor = mockData?.buttonColor || "#dc2751";

  return (
      <a href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`overflow-hidden relative flex w-full items-center justify-center rounded-full border
                    border-white  px-4 py-2 text-white shadow-lg transition-all before:absolute before:left-0 before:top-0
                    before:h-full before:w-0 before:rounded-l-full before:duration-500 after:absolute after:right-0 after:top-0
                    after:h-full after:w-0 after:rounded-r-full after:duration-500 md:px-5 md:py-2 lg:max-w-48 lg:px-6 lg:py-3`}
        style={{
          borderColor: isHovered ? buttonColor : "white",
          color: isHovered ? buttonColor : "white",
          boxShadow: isHovered ? `10px 10px 5px 0px ${buttonColor}80` : "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <span className="relative z-10 font-bold md:text-lg lg:text-xl">
          {children}
        </span>
      </a>
  );
};

export default CustomBuyButton;