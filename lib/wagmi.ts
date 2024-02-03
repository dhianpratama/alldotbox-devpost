import { http, createConfig,cookieStorage,createStorage  } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  ssr: true,
  storage: createStorage({  
    storage: cookieStorage, 
  }),  
  transports: {
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}