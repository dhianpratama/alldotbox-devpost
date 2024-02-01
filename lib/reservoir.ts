const sdk = require("api")("@reservoirprotocol/v3.0#7nymb9sls2akx0b");
sdk.auth("demo-api-key");
sdk.server("https://api-optimism.reservoir.tools");

export const getUserDomains = async (
  walletAddress: string,
  contract: string,
) => {
  const { data } = await sdk.getUsersUserTokensV9({
    contract: contract,
    user: walletAddress,
    accept: "*/*",
  });
  console.log(data);

  return data.tokens;
};
