"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const projectId = "AllBox";

const { wallets } = getDefaultWallets({
  appName: "AllBox",
  projectId,
  chains,
});

const connectors = connectorsForWallets([...wallets]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        appInfo={{
          appName: "AllBox",
        }}
        chains={chains}
      >
        <SessionProvider>
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          <ModalProvider>{children}</ModalProvider>
        </SessionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
