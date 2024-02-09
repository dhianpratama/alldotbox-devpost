import { ethers, toBeHex } from "ethers";

export const uint256Tobytes32 = (token: string) => {
  const bigNumberValue = BigInt(token);
  const bytes32Value = ethers.zeroPadValue(toBeHex(bigNumberValue), 32);
  return bytes32Value;
};
