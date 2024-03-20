import { http, createConfig,cookieStorage,createStorage  } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet,optimism],
  connectors: [
    injected(),
  ],
  ssr: true,
  storage: createStorage({  
    storage: cookieStorage, 
  }),  
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}