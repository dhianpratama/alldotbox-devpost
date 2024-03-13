import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DomainCard from "./domain-card";
import Image from "next/image";
import { getUserDomains } from "@/lib/reservoir";
import { uint256Tobytes32 } from "@/lib/web3";
import { get3DnsDomainInfo } from "@/lib/3dns";
import { registry } from "@/lib/config";

export default async function Sites({ limit }: { limit?: number }) {
  const session = await getSession();

  if (!session?.user?.address) {
    redirect("/login");
  }

  const { tokens: boxTokens } = await getUserDomains(
    session.user.address,
    registry.BOX,
  );

  const { tokens: namefiTokens } = await getUserDomains(
    session.user.address,
    registry.NAMEFI,
  );

  const { tokens: threeDNSTokens } = await getUserDomains(
    session.user.address,
    registry.THREEDNS,
  );

  const tokens = [...boxTokens, ...namefiTokens, ...threeDNSTokens];

  const sites = await prisma.site.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    ...(limit ? { take: limit } : {}),
  });

  const ownerTokens = await Promise.all(
    tokens?.map(async ({ token }: { token: any }) => {
      const dbSite = sites.find((s: any) => s.tokenId === token.tokenId);

      if (!token.name) {
        const onChainDNSData = await get3DnsDomainInfo(
          uint256Tobytes32(token.tokenId),
        );
        token.name = onChainDNSData.domainName
          ? onChainDNSData.domainName.replace(/\.+$/, "")
          : null;
      }

      return {
        ...dbSite,
        isLive: !!dbSite,
        token: {
          name: token.name,
          chainId: token.chainId,
          contract: token.contract,
          tokenId: token.tokenId,
          image: token.image,
        },
      };
    }),
  );

  return ownerTokens?.length > 0 ? (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ownerTokens?.map((site: any) => (
          <DomainCard key={site.tokenId} data={site} />
        ))}
      </div>
    </>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Sites Yet</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any sites yet. Create one to get started.
      </p>
    </div>
  );
}
