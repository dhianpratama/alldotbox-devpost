"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { type State, WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";

type Props = {
  children: React.ReactNode,
  initialState: State, 
}

export function Providers({
  children,
  initialState,
}: Props) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          <ModalProvider>{children}</ModalProvider>
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
