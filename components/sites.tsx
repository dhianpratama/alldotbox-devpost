import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DomainCard from "./domain-card";
import Image from "next/image";
import { getUserDomains } from "@/lib/reservoir";

export default async function Sites({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { tokens } = await getUserDomains(
    "0x22739F9bbc10cf6412a67a3f135cD89E3e9E35F7",
    "0xbb7b805b257d7c76ca9435b3ffe780355e4c4b17",
  );

  // const sites = await prisma.site.findMany({
  //   where: {
  //     user: {
  //       id: session.user.id as string,
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  //   ...(limit ? { take: limit } : {}),
  // });

  return tokens.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tokens.map((site: any) => (
        <DomainCard key={site.token.tokenId} data={site.token} />
      ))}
    </div>
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
