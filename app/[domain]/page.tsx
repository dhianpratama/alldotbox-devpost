import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, toDateString } from "@/lib/utils";

import { getSiteData } from "@/lib/fetchers";
import Image from "next/image";
import Head from "next/head";

export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
    // feel free to remove this filter if you want to generate paths for all sites
    where: {
      subdomain: "demo",
    },
  });
  console.log({ allSites });
  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data] = await Promise.all([getSiteData(domain)]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="body-prevent-scrolling font-hind bg-gray-900 text-base font-normal leading-7 text-gray-300">
        {/* <div className="z-1 container  absolute left-0 top-0 flex h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-20">
            <h1 className="text-8xl font-extrabold leading-10 tracking-wider text-white">
              Cyber.Box
            </h1>
            <h2 className="text-xl">
              This is a Web2 + Web3 domain name, and the domain name is on sale.
            </h2>

            <a
              href="https://twitter.com/58name_com"
              target="_blank"
              className="verflow-hidden relative flex h-[50px] w-40 items-center justify-center rounded border border-pink-400 bg-white px-32 py-10 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
            >
              <span className="relative z-10  text-4xl font-bold">Contact</span>
            </a>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-screen w-screen">
          <img className="h-full w-full" src="/slider_1.jpg" alt="" />
        </div> */}
        {/* <!-- Background Container --> */}
        <div className="bg-container">
          <img
            className="bg-image"
            src="/slider_1.jpg"
            alt="Background Image"
          />
        </div>

        {/* <!-- Content Container --> */}
        <div className="content-container space-y-8">
          {/* <!-- Your Title, Subtitle, and Button --> */}
          <h1 className="text-9xl font-bold text-white">Cyber.Box</h1>
          <p className="text-4xl text-white">
            This is a Web2 + Web3 domain name, and the domain name is on sale.
          </p>

          <a
            href="https://twitter.com/58name_com"
            target="_blank"
            className="verflow-hidden relative mx-auto flex w-52 min-w-[40px]  items-center justify-center rounded border border-pink-400 bg-white p-4 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
          >
            <span className="relative z-10  text-4xl font-bold ">Contact</span>
          </a>
        </div>
      </div>
    </>
  );
}
