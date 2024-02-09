export const get3DnsDomainInfo = async (domainByte32: string) => {
    const cleanedHexString = domainByte32.replace(/^0x/, "");
    
    return await fetch(
      `https://api.3dns.xyz/api/v1/core_backend_service/domain/get_domain/${cleanedHexString}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
  };