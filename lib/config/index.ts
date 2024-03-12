interface ReservoirEntry {
  url: string;
  contract: string;
  chainId: number;
}

interface Reservoir {
  [key: string]: ReservoirEntry;
}
export const reservoir: Reservoir = {
  box: {
    url: "https://api-optimism.reservoir.tools",
    contract: "0xd1e5b0ff1287aa9f9a268759062e4ab08b9dacbe",
    chainId: 10,
  },
  "3dns-powered-domains": {
    url: "https://api-optimism.reservoir.tools",
    contract: "0xbb7b805b257d7c76ca9435b3ffe780355e4c4b17",
    chainId: 10,
  },
  namefinft: {
    url: "https://api.reservoir.tools",
    contract: "0x0000000000cf80e7cf8fa4480907f692177f8e06",
    chainId: 1,
  },
};

export const enum registry {
  BOX = "box",
  THREEDNS = "3dns-powered-domains",
  NAMEFI = "namefinft",
}

export const getRegistryByContract = (contract: string): ReservoirEntry => {
  for (const key in reservoir) {
    if (Object.prototype.hasOwnProperty.call(reservoir, key)) {
      const element: ReservoirEntry = reservoir[key];
      if (element.contract === contract) {
        return element;
      }
    }
  }
  return reservoir[registry.BOX];
};
