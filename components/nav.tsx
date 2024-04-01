"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Menu } from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { registry, reservoir } from "@/lib/config";

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Sites",
          href: "/",
          isActive: segments.length === 0,
          icon: <ArrowLeft width={18} />,
        },
      ];
    }
    return [
      {
        name: "My Sites",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const externalLinks = [
    {
      // name: "Buy on 3DNS",
      name: "Register Domain",
      href: reservoir[registry.THREEDNS].referralLink,
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black dark:text-white"
        >
          <g clip-path="url(#clip0_223_16)">
            <path
              d="M24.517 15.256L28.002 9.75H11.249V15.256H24.517ZM24.517 15.256H31.936L28.901 20.542H21.368L24.517 15.256ZM13.413 22.18H20.384L23.596 27.455C23.7812 27.7588 23.882 28.1066 23.888 28.4624C23.894 28.8182 23.8049 29.1691 23.63 29.479L20.722 34.624L13.413 22.18Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_223_16">
              <rect width="42" height="42" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        // className={`fixed z-20 right-5 top-7 sm:hidden`}
        className={`fixed right-5 top-7 z-20 lg:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu className=" text-black dark:text-white" width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
          // } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0 dark:border-stone-700 dark:bg-stone-900`}
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 lg:translate-x-0 dark:border-stone-700 dark:bg-stone-900`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />
            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
        <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
