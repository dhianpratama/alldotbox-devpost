import LogoutButton from "./logout-button";
import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { config } from "@/lib/wagmi";
import { getEnsName } from "@wagmi/core";

export default async function Profile() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const ensName = await getEnsName(config, {
    address: `0x${session?.user?.address?.substring(2)}`,
  });

  return (
    <div className="flex w-full items-center justify-between">
      <span className="flex w-10/12 flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
        <Image
          src={
            session.user.image ??
            `https://avatar.vercel.sh/${session.user.email}`
          }
          width={40}
          height={40}
          alt={session.user.name ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">
          {ensName || session?.user?.address}
        </span>
      </span>
      <LogoutButton />
    </div>
  );
}
