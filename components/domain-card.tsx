"use client";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random, truncateToken } from "@/lib/utils";
import Link from "next/link";
import CreateSiteButton from "./create-site-button";
import CreateSiteModalV2 from "./modal/create-site-v2";
import PopoverMenu from "./popover-menu";
import DeleteSiteForm from "./modal/delete-site";
import UnpublishSiteButton from "./unpublish-site-button";
import { AlertCircle, InfoIcon, Share2, XCircle } from "lucide-react";
import ShareButton from "./share-button";
import { getRegistryByContract } from "@/lib/config";
import { useDomainStatus } from "./form/use-domain-status";
import LoadingDots from "./icons/loading-dots";
import Tooltip from "./tooltip";
import Leaflet from "./modal/leaflet";

export default function DomainCard({ data }: { data: any }) {
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const _registry = getRegistryByContract(data?.contract);
  const { status, domainJson, loading } = useDomainStatus({
    domain: data?.token?.name,
  });

  return (
    <div className="relative rounded-lg border border-stone-200 pb-5 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="relative flex">
        <BlurImage
          alt={data?.token?.name ?? "Card thumbnail"}
          width={500}
          height={500}
          className="h-44 object-cover"
          src={data?.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <img
          src={`${_registry.logo}`}
          className="absolute ml-2 mt-2 w-[75px]"
          alt=""
        />
      </div>
      <div className="border-t border-stone-200 p-4 dark:border-stone-700">
        <div className="flex items-center justify-between gap-2">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data?.token?.name || truncateToken(data?.token?.tokenId, 6)}
          </h3>
          {data.isLive && (
            <>
              <div className="flex-end flex gap-2">
                <PopoverMenu>
                  <Link
                    href={`/site/${data.id}/settings`}
                    className="block px-4 py-2 text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 dark:hover:text-white"
                  >
                    Edit Site
                  </Link>
                  <UnpublishSiteButton>
                    <DeleteSiteForm
                      siteName={
                        data?.token?.name ||
                        truncateToken(data?.token?.tokenId, 6)
                      }
                      id={data.id}
                    />
                  </UnpublishSiteButton>
                </PopoverMenu>

                <ShareButton
                  quote={`I built my first website on tokenized domains. Check out ${data.customDomain}`}
                />
              </div>
            </>
          )}
        </div>
        <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
          {data.description}
        </p>
      </div>
      {/* </Link> */}
      {data.isLive ? (
        <div className="bottom-4 flex w-full items-center justify-between gap-2 px-4 lg:gap-4">
          <div className="flex w-full flex-col space-y-2">
            {data?.token?.name && (
              <div className="flex space-x-1">
                <a
                  href={`https://${data?.token?.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate rounded-md bg-stone-100 p-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                  {data?.token?.name}
                </a>
                <a
                  href="https://blog.ensdom.com/blog/a-simple-for-sale-lander-for-box-domains"
                  rel="noreferrer"
                  target="_blank"
                  className="flex items-center text-stone-600"
                >
                  <InfoIcon width={18} />
                </a>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <a
                href={
                  process.env.NEXT_PUBLIC_VERCEL_ENV
                    ? `https://${url}`
                    : `http://${data.subdomain}.localhost:3000`
                }
                target="_blank"
                rel="noreferrer"
                className="truncate rounded-md bg-stone-100 p-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
              >
                {url} ↗
              </a>

              {loading ? (
                <LoadingDots color="#A8A29E"/>
              ) : !status || status === "Valid Configuration" || !domainJson ? (
                <span className="flex items-center rounded-md bg-green-100 p-1  text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50">
                  <p className="w-10">● Live</p>
                </span>
              ) : (
                <div className="group relative flex">
                  <span className="flex items-center rounded-md bg-red-100 p-1  text-sm font-medium text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:bg-opacity-50 dark:text-red-400 dark:hover:bg-red-800 dark:hover:bg-opacity-50">
                    <p className="w-14">● Invalid</p>
                  </span>
                  <div
                    style={{
                      marginTop: "38px",
                      zIndex:9,
                    }}
                    className="translate-y-auto absolute mx-auto -translate-x-3/4 rounded-md dark:bg-stone-800 bg-stone-100 dark:text-stone-300 px-1 text-sm text-black  opacity-0 transition-opacity group-hover:opacity-100"
                    // className="translate-y-auto absolute left-0 md:left-5 m-4 mx-auto -translate-x-full rounded-md bg-gray-800 px-1 text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <div className="flex flex-wrap w-52 p-2">
                      <div>DNS Configuration is Invalid.</div>
                      <div>
                        <a href="" className="underline" target="_blank">See tutorial</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
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
                title: data?.title || "",
              }}
            />
          </CreateSiteButton>
        </div>
      )}
    </div>
  );
}
