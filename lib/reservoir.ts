const RESERVOIR_URL = "https://api-optimism.reservoir.tools";
const config = {
  headers: { accept: "*/*", "x-api-key": process.env.RESERVOIR_API_KEY },
};

const myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("x-api-key", process.env.RESERVOIR_API_KEY || "demo-api-key");

export const getUserDomains = async (
  walletAddress: string,
  contract: string,
) => {
  const url = `${RESERVOIR_URL}/users/${walletAddress}/tokens/v9?contract=${contract}`;
  
  return await fetch(
    url,
    {
      method: "GET",
      headers: myHeaders,
    },
  ).then((res) => {
    return res.json();
  });
};


export const getTokenListing = async (
  contract: string,
  token: string,
) => {
  
  const url = `${RESERVOIR_URL}/orders/asks/v5?token=${contract}:${token}`;
  
  return await fetch(
    url,
    {
      method: "GET",
      headers: myHeaders,
    },
  ).then((res) => {
    return res.json();
  });
};
