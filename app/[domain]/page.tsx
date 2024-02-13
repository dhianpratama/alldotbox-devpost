import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data] = await Promise.all([getSiteData(domain)]);
  const buttonColor = data?.buttonColor || "#dc2751";
  if (!data) {
    notFound();
  }

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
            src={data?.image || "/slider_1.jpg"}
            alt="Background Image"
          />
        </div>

        {/* <!-- Content Container --> */}
        <div className="content-container  space-y-8">
          {/* <!-- Your Title, Subtitle, and Button --> */}
          <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
            {data?.title}
          </h1>
          <p className="text-lg text-white sm:text-xl  md:px-4  md:text-2xl lg:text-3xl">
            {data?.description}
          </p>
          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-6 md:flex-row md:px-16">
            {data?.twitter && (
              <a
                style={{
                  backgroundColor: data?.buttonColor || "#dc2751",
                  borderColor: data?.buttonColor || "#dc2751",
                  color: data?.buttonTextColor || "#FFFFFF",
                }}
                href={`https://twitter.com/${data?.twitter}`}
                target="_blank"
                className="verflow-hidden relative flex w-full items-center justify-center rounded-full border   px-4 py-2  shadow-lg transition-all  hover:shadow-white/50  md:px-5 md:py-2 lg:max-w-40 lg:px-6 lg:py-3"
              >
                <span className="relative z-10 font-bold  md:text-lg lg:text-xl ">
                  Contact
                </span>
              </a>
            )}
            <a
              href={`https://opensea.io/assets/optimism/${data?.contract}/${data?.tokenId}`}
              target="_blank"
              className={`overflow-hidden relative flex w-full items-center justify-center rounded-full border border-white  px-4 py-2 text-white shadow-lg transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:rounded-l-full before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:rounded-r-full after:duration-500 hover:border-[${buttonColor}] hover:text-[${buttonColor}] hover:shadow-[${buttonColor}]  hover:before:w-2/4 hover:after:w-2/4 md:px-5 md:py-2 lg:max-w-40 lg:px-6 lg:py-3`}
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
              href={`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/`}
              rel="noreferrer"
              target="_blank"
              className="mb-2 mr-2 text-gray-300 transition-colors duration-300 hover:text-blue-50"
            >
              Made with all.box
            </a>
          </div>
        </footer>
      </div>
    </>
    // <>
    //   <div className="body-prevent-scrolling font-hind bg-gray-900 text-base font-normal leading-7 text-gray-300">
    //     <nav className="absolute left-0 top-0  h-[100px] w-full">
    //       <div className="container mx-auto flex h-full items-center">
    //         <img src="/logo-light.png" className="mx-36 w-[200px]" alt="" />
    //       </div>
    //     </nav>

    //     <div className="bg-container">
    //       <img
    //         className="bg-image"
    //         src="/slider_1.jpg"
    //         alt="Background Image"
    //       />
    //     </div>

    //     {/* <!-- Content Container --> */}
    //     <div className="content-container  space-y-8">
    //       {/* <!-- Your Title, Subtitle, and Button --> */}
    //       <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
    //         {data.name}
    //       </h1>
    //       <p className="text-lg text-white  sm:text-xl  md:text-2xl lg:text-3xl">
    //         {data.description}
    //       </p>
    //       <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
    //         <a
    //           href="https://twitter.com/58name_com"
    //           target="_blank"
    //           className="verflow-hidden relative flex w-full min-w-[40px]  items-center justify-center rounded border border-pink-400 bg-white p-4 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
    //         >
    //           <span className="relative z-10 text-xl  font-bold sm:text-2xl  md:text-3xl lg:text-4xl ">
    //             Contact
    //           </span>
    //         </a>
    //         <a
    //           href="https://twitter.com/58name_com"
    //           target="_blank"
    //           className="verflow-hidden relative  flex w-full min-w-[40px]  items-center justify-center rounded border border-pink-400 bg-white p-4 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
    //         >
    //           <span className="relative z-10 text-xl  font-bold sm:text-2xl  md:text-3xl lg:text-4xl ">
    //             Buy
    //           </span>
    //         </a>
    //       </div>
    //     </div>

    //     <footer className="absolute bottom-0 left-0 w-screen">
    //       <div className="container mx-auto flex items-center justify-end px-6 py-8">
    //         <a
    //           href="https://alldotbox.com/"
    //           rel="noreferrer"
    //           target="_blank"
    //           className="mr-32 text-white transition-colors duration-300 hover:text-blue-50"
    //         >
    //           made with all.box
    //         </a>
    //       </div>
    //     </footer>
    //   </div>
    // </>
  );
}
