import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Platforms Starter Kit",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
      <Image
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute left-0 top-0 -z-10 h-screen w-screen object-fill"
        src="/nm_background.jpg"
        alt=""
      />
    </div>
  );
}
