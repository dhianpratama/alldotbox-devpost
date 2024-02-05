"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function LogoutButton() {
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      signOut({ callbackUrl: process.env.NEXTAUTH_URL });
    }
  }, [isConnected]);

  return (
    <button
      onClick={() => {
        disconnect();
        // signOut({ redirect: true, callbackUrl: process.env.NEXTAUTH_URL });
        // redirect("/");
      }}
      className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
    >
      <LogOut width={18} />
    </button>
  );
}
