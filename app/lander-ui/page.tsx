import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import Image from "next/image";

import { Metadata, ResolvingMetadata } from "next";

const collectionId = "0xbb7b805b257d7c76ca9435b3ffe780355e4c4b17";
const tokenID =
  "70296981572109517939404015929496700813276711764729391364588106005347322748339";

const buttonTextColor = "#FFFFFF";
const buttonColor = "#dc2751";
const title = "Cyber.Box";
const subTitle =
  "This is a Web2 + Web3 domain name, and the domain name is on sale.";
const ogImage = "/og-image.png";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // // read route params
  // const id = params.id

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  // return {
  //   title: product.title,
  //   openGraph: {
  //     images: ['/some-specific-page-image.jpg', ...previousImages],
  //   },
  // }

  return {
    title: title,
    description: subTitle,
    openGraph: {
      title: title,
      description: subTitle,
      images: [ogImage],
    },
  };
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  return (
    <>
      <div className="body-prevent-scrolling font-hind bg-gray-900 text-base font-normal leading-7 text-gray-300">
        <nav className="absolute left-0 top-0  h-[100px] w-full">
          <div className=" mx-auto flex h-full items-start">
            <img src="/logo-light.png" className="ml-2 mt-2 w-[100px]" alt="" />
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
            {title}
          </h1>
          <p className="text-lg text-white sm:text-xl  md:px-4  md:text-2xl lg:text-3xl">
            {subTitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-6 md:flex-row md:px-16">
            <a
              style={{
                backgroundColor: buttonColor,
                borderColor: buttonColor,
                color: buttonTextColor,
              }}
              href="https://twitter.com/58name_com"
              target="_blank"
              className="verflow-hidden relative flex w-full items-center justify-center rounded-full border   px-4 py-2  shadow-lg transition-all  hover:shadow-white/50  md:px-5 md:py-2 lg:max-w-40 lg:px-6 lg:py-3"
            >
              <span className="relative z-10 font-bold  md:text-lg lg:text-xl ">
                Contact
              </span>
            </a>
            <a
              href={`https://opensea.io/assets/optimism/${collectionId}/${tokenID}`}
              target="_blank"
              className="verflow-hidden relative flex w-full items-center justify-center rounded-full border border-white  px-4 py-2 text-white shadow-lg transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:rounded-l-full before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:rounded-r-full after:duration-500 hover:border-pink-400 hover:text-pink-400 hover:shadow-pink-400/50   hover:before:w-2/4 hover:after:w-2/4 md:px-5 md:py-2 lg:max-w-40 lg:px-6 lg:py-3"
            >
              <span className="relative z-10 font-bold  md:text-lg lg:text-xl ">
                Buy
              </span>
            </a>
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 w-screen">
          <div className="bg-red mx-auto flex h-[100px]  items-end justify-end">
            <a
              href="https://alldotbox.com/"
              rel="noreferrer"
              target="_blank"
              className="mb-2 mr-2 text-gray-300 transition-colors duration-300 hover:text-blue-50"
            >
              made with all.box
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
