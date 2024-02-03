"use client";

// import { getSession } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Image from "next/image";
import LogoutButton from "./logout-button";
import { useAccount } from "wagmi";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

export default async function Profile({ children }: { children: ReactNode }) {
  const { address, addresses } = useAccount();

  console.log(addresses);
  // if (!session?.user) {
  //   redirect("/login");
  // }

  return (
    <div className="flex w-full items-center justify-between">
      <span className="flex w-10/12 flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
        {/* <Image
          src={
            session.user.image ??
            `https://avatar.vercel.sh/${session.user.email}`
          }
          width={40}
          height={40}
          alt={session.user.name ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        /> */}
        <span className="truncate text-sm font-medium" onClick={() => {}}>
          {address}
        </span>
      </span>
      <LogoutButton />
    </div>
  );
}
