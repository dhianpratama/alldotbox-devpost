import { Copy, Share2, Twitter, TwitterIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
  quote: string;
}

export default function ShareButton({ quote }: ShareButtonProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("Copy");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
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

  // const shareUrl = `https://${subdomain}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(quote)
      .then(() => {
        setCopyMessage("Copied");
        setTimeout(() => {
          setCopyMessage("Copy");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

  const handleShareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(twitterShareUrl, "_blank");
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-gray-50 lg:p-1 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:ring-gray-600 "
        >
          <Share2 className="p-0.5"/>
        </button>
        {isOpen && (
          <>
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right cursor-pointer divide-y divide-gray-100 rounded-md bg-white text-stone-600 shadow-lg ring-1  ring-black ring-opacity-5 hover:bg-gray-100 dark:divide-stone-600 dark:bg-stone-800  dark:text-stone-400 dark:hover:bg-stone-700">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div
                  className="block px-4 py-2 text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 dark:hover:text-white"
                  onClick={handleCopyLink}
                >
                  <div className="flex items-center justify-between">
                    <p>{copyMessage}</p>
                    <Copy className="h-5 w-5"/>
                  </div>
                </div>
                <button
                  className="block w-full px-4 py-2 text-left text-sm  font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 dark:hover:text-white"
                  onClick={handleShareOnTwitter}
                >
                  <div className="flex items-center justify-between">
                    <p>Share on Twitter</p>
                    <svg className="h-4 w-4" fill="#a8a29e" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
                  </div>
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}
