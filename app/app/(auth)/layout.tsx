import { Metadata } from "next";
import { ReactNode } from "react";
import DomainSlider from "./login/domain-slider";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import dynamic from "next/dynamic";

// const DomainSlider = dynamic(() => import("./login/domain-slider"), { ssr: true });

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
    <>
      {/* <div className="flex  h-screen flex-col items-center justify-center bg-black py-6 xl:py-12 sm:px-6 lg:px-8"> */}
      <div className="flex h-svh flex-col items-center justify-center bg-black py-6 xl:py-12 sm:px-6 lg:px-8">
        {children}
        <DomainSlider />
      </div>
    </>
  );
}
