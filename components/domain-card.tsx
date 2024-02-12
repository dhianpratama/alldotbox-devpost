"use client";

import BlurImage from "@/components/blur-image";
import { createSite } from "@/lib/actions";
import { placeholderBlurhash, random, truncateToken } from "@/lib/utils";
// import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingDots from "@/components/icons/loading-dots";
import { useState } from "react";
import CreateSiteButton from "./create-site-button";
import CreateSiteModalV2 from "./modal/create-site-v2";

export default function DomainCard({ data }: { data: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const onCreateSite = async () => {
  //   createSite(data).then((res: any) => {
  //     if (res.error) {
  //       toast.error(res.error);
  //     } else {
  //       const { id } = res;
  //       router.refresh();
  //       router.push(`/site/${id}`);
  //       toast.success(`Successfully created site!`);
  //     }
  //   });
  // };


  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative rounded-lg border border-stone-200 pb-5 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/site/${data.id}/settings`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
      <BlurImage
        alt={data?.token?.name ?? "Card thumbnail"}
        width={500}
        height={500}
        className="h-44 object-cover"
        src={data?.image ?? "/placeholder.png"}
        placeholder="blur"
        blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
      />
      <div className="border-t border-stone-200 p-4 dark:border-stone-700">
        <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
          {data?.token?.name || truncateToken(data?.token?.tokenId, 6)}
        </h3>
        <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
          {data.description}
        </p>
      </div>
      {/* </Link> */}
      {data.isLive ? (
        <div className="bottom-4 flex w-full justify-between space-x-4 px-4">
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>

          <span className="flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50">
            <p>● Live</p>
          </span>
        </div>
      ) : (
        // <div className="bottom-4 flex w-full justify-end space-x-4 px-4">
        //   {/* <button className="bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md"> */}
        //   <button
        //     onClick={() => {
        //       setLoading(true);
        //     }}
        //     className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
        //   >
        //     {loading ? <LoadingDots color="#A8A29E" /> : "Create"}
        //   </button>
        // </div>
        <div className="bottom-4 flex w-full justify-end space-x-4 px-4">
          <CreateSiteButton>
            <CreateSiteModalV2
              siteData={{
                name: data?.token?.name || data?.token?.tokenId,
                subdomain: data?.token?.name
                  ? data?.token?.name?.replace(".", "-")
                  : `${data?.token?.tokenId.slice(
                      0,
                      6,
                    )}${data?.token?.tokenId.slice(-6)}`,
                description: data.token?.description || "",
                tokenId: data?.token?.tokenId,
                contract: data?.token?.contract,
                chainId: data?.token?.chainId,
                customDomain: data?.token?.name || "",
              }}
            />
          </CreateSiteButton>
        </div>
      )}
      </Link>
    </div>
  );
}
