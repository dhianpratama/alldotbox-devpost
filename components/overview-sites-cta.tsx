import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateSiteButton from "./create-site-button";
import CreateSiteModal from "./modal/create-site";
import Link from "next/link";
import { getUserDomains } from "@/lib/reservoir";

export default async function OverviewSitesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }
  const sites = await prisma.site.count({
    where: {
      userId: session.user.id as string,
    },
  });

  const userSites = await getUserDomains(
    "0x272DBB81755A2247D675BBbAFDF0C3ccd886C9ad",
    "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  );

  return sites > 0 ? (
    <Link
      href="/sites"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      View All Sites
    </Link>
  ) : (
    <CreateSiteButton>
      <CreateSiteModal/>
    </CreateSiteButton>
  );
}
