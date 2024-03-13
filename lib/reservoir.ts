import { getRegistryByContract, registry, reservoir } from "./config";

const RESERVOIR_URL = "https://api-optimism.reservoir.tools";

const myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("x-api-key", process.env.RESERVOIR_API_KEY || "demo-api-key");

export const getUserDomains = async (
  walletAddress: string,
  registry: registry,
) => {
  const reservoirInfo = reservoir[registry];

  const url = `${reservoirInfo.url}/users/${walletAddress}/tokens/v9?contract=${reservoirInfo.contract}`;
  return await fetch(url, {
    method: "GET",
    headers: myHeaders,
  }).then((res) => {
    return res.json();
  });
};

export const getTokenListing = async (contract: string, token: string) => {
  const resvRegistry = getRegistryByContract(contract);

  const url = `${resvRegistry.url}/orders/asks/v5?token=${contract}:${token}`;

  return await fetch(url, {
    method: "GET",
    headers: myHeaders,
  }).then((res) => {
    return res.json();
  });
};
