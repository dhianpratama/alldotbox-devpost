"use client";

import { ReactNode, useRef } from "react";
import cn from "clsx";
export default function Tooltip({
  children,
  className,
  content,
}: {
  children: ReactNode;
  className: string;
  content: any;
}) {
  const tipRef = useRef<HTMLDivElement>(null);
  const handleMouseLeave = () => {
    if (!tipRef.current) {
      return;
    }
    tipRef.current.style.pointerEvents = "none";
    tipRef.current.style.opacity = "0";
    tipRef.current.style.visibility = "hidden";
    tipRef.current.style.marginTop = "10px";
  };
  const handleMouseEnter = () => {
    if (!tipRef.current) {
      return;
    }
    tipRef.current.style.opacity = "1";
    tipRef.current.style.visibility = "visible";
    tipRef.current.style.marginTop = "30px";
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={tipRef}
        className="whitespace-no-wrap bg-skin-disable dark:bg-skin-tertiary text-skin-base absolute z-10 flex w-64 items-center rounded-lg px-4 py-2 transition-all duration-150"
        style={{ top: "0", opacity: 0 }}
      >
        <div
          className="bg-skin-disable dark:bg-skin-tertiary absolute h-3 w-3 overflow-ellipsis"
          style={{ top: "-6px", right: "20px", transform: "rotate(45deg)" }}
        />
        {content}
      </div>
      {children}
    </div>
  );
}
