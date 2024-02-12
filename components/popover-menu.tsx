import { MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useEffect, useRef, useState } from "react";

export default function PopoverMenu({ children }: { children: ReactNode }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event:any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className=" relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={ ()=>toggleMenu()}
          type="button"
          className="inline-flex items-center rounded-lg p-0.5 lg:p-1 text-center text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-gray-50 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:ring-gray-600 "
        >
          <MoreVertical />
        </button>

        {isOpen &&(
          <div className="z-10 absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white text-stone-600 shadow-lg ring-1 ring-black  ring-opacity-5 hover:bg-stone-200 dark:divide-stone-600 dark:bg-stone-800 dark:text-stone-400  dark:hover:bg-stone-700">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
             {children}
            </div>
          </div>
        )}
      </div>
    </>
  );
}