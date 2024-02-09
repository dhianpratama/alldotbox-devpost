import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import Image from "next/image";

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
  console.log("SiteHomePage<>>>>>>>>>>> ,,, ",data)


  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="body-prevent-scrolling font-hind bg-gray-900 text-base font-normal leading-7 text-gray-300">
        <nav className="absolute left-0 top-0  h-[100px] w-full">
          <div className="container mx-auto flex h-full items-center">
            <img src="/logo-light.png" className="mx-36 w-[200px]" alt="" />
          </div>
        </nav>

        <div className="bg-container">
          <img
            className="bg-image"
            src="/slider_1.jpg"
            alt="Background Image"
          />
        </div>

        {/* <!-- Content Container --> */}
        <div className="content-container  space-y-8">
          {/* <!-- Your Title, Subtitle, and Button --> */}
          <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Cyber.Box
          </h1>
          <p className="text-lg text-white  sm:text-xl  md:text-2xl lg:text-3xl">
            This is a Web2 + Web3 domain name, and the domain name is on sale.
          </p>
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <a
              href="https://twitter.com/58name_com"
              target="_blank"
              className="verflow-hidden relative flex w-full min-w-[40px]  items-center justify-center rounded border border-pink-400 bg-white p-4 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
            >
              <span className="relative z-10 text-xl  font-bold sm:text-2xl  md:text-3xl lg:text-4xl ">
                Contact
              </span>
            </a>
            <a
              href="https://twitter.com/58name_com"
              target="_blank"
              className="verflow-hidden relative  flex w-full min-w-[40px]  items-center justify-center rounded border border-pink-400 bg-white p-4 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
            >
              <span className="relative z-10 text-xl  font-bold sm:text-2xl  md:text-3xl lg:text-4xl ">
                Buy
              </span>
            </a>
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 w-screen">
          <div className="container mx-auto flex items-center justify-end px-6 py-8">
            <a
              href="d"
              className="mr-32 text-white transition-colors duration-300 hover:text-blue-50"
            >
              made with all.box
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
