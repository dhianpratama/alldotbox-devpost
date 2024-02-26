import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "All.box (Build For Sale Landing Pages)",
  description:
    "Build your For Sale Lander for your Tokenized Domains 3DNS. Box and NameFi",
  openGraph: {
    title: "All.box (Build For Sale Landing Pages)",
    description:
      "Build your For Sale Lander for your Tokenized Domains 3DNS. Box and NameFi",
    images: ["/all-box.png"],
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-black py-12 sm:px-6 lg:px-8">
      {children}
      <div className="mb-4 h-[15vh] w-full overflow-hidden">
        <div
          className="animate-marquee flex h-full w-[200%] gap-4 pr-4"
          style={{
            animationDuration: "75s",
          }}
        >
          <div className="flex h-full flex-1 gap-4">
            <div className="flex flex-1 items-center justify-center bg-slate-500 p-1 text-center text-white">
              Item
            </div>
            <div className="flex flex-1 items-center justify-center bg-slate-500 p-1 text-center text-white">
              Item
            </div>
            <div className="flex flex-1 items-center justify-center bg-slate-500 p-1 text-center text-white">
              Item
            </div>
          </div>
          <div className="flex h-full flex-1 gap-4">
            <div className="flex flex-1 items-center justify-center bg-red-600 p-1 text-center text-white">
              Item
            </div>
            <div className="flex flex-1 items-center justify-center bg-red-600 p-1 text-center text-white">
              Item
            </div>
            <div className="flex flex-1 items-center justify-center bg-red-600 p-1 text-center text-white">
              Item
            </div>
          </div>
        </div>
      </div>
      {/* <Image
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute left-0 top-0 -z-10 h-screen w-screen object-fill"
        src="/nm_background.jpg"
        alt=""
      /> */}
    </div>
  );
}
