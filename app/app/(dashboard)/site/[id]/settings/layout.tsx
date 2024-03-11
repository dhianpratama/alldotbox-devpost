import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import SiteSettingsNav from "./nav";
import { InfoIcon } from "lucide-react";

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <h1 className="font-cal text-xl font-bold sm:text-3xl dark:text-white">
          Settings for {data.name}
        </h1>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-1 items-center">
            <a
              href={`https://${data?.customDomain}`}
              target="_blank"
              rel="noreferrer"
              className="truncate p-1 rounded-md bg-stone-100 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
            >
              {data?.customDomain}
            </a>
            <a
              href="https://blog.ensdom.com/blog/a-simple-for-sale-lander-for-box-domains"
              rel="noreferrer"
              target="_blank"
              className="text-stone-600"
            >
              <InfoIcon width={18} />
            </a>
          </div>
         
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate p-1 rounded-md bg-stone-100 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </div>
      {children}
    </>
  );
}
