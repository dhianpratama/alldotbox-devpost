"use client";

import { useState } from "react";
import { useDomainStatus } from "./use-domain-status";
import { getSubdomain } from "@/lib/domains";
import { AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const InlineSnippet = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <span
      className={cn(
        "inline-block rounded-md bg-blue-100 px-1 py-0.5 font-mono text-blue-900 dark:bg-blue-900 dark:text-blue-100",
        className,
      )}
    >
      {children}
    </span>
  );
};
export default function DomainConfiguration({
  domain,
  subdomain,
}: {
  domain: string;
  subdomain: string;
}) {
  const [recordType, setRecordType] = useState<"A" | "CNAME">("A");

  const { status, domainJson } = useDomainStatus({ domain });

  if (!status || status === "Valid Configuration" || !domainJson) return null;

  // const subdomain = getSubdomain(domainJson.name, domainJson.apexName);

  const txtVerification =
    (status === "Pending Verification" &&
      domainJson.verification.find((x: any) => x.type === "TXT")) ||
    null;

  return (
    <div className="border-t border-stone-200 px-10 pb-5 pt-7 dark:border-stone-700">
      <div className="mb-4 flex items-center space-x-2">
        {status === "Pending Verification" ? (
          <AlertCircle
            fill="#FBBF24"
            stroke="currentColor"
            className="text-white dark:text-black"
          />
        ) : (
          <XCircle
            fill="#DC2626"
            stroke="currentColor"
            className="text-white dark:text-black"
          />
        )}
        <p className="text-lg font-semibold dark:text-white">
          {status === "Domain Not Found"
            ? "Invalid Domain Configuration"
            : status}
        </p>
      </div>
      {txtVerification ? (
        <>
          <p className="text-sm dark:text-white">
            Please set the following TXT record on{" "}
            <InlineSnippet>{domainJson.apexName}</InlineSnippet> to prove
            ownership of <InlineSnippet>{domainJson.name}</InlineSnippet>:
          </p>
          <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
            <div>
              <p className="text-sm font-bold">Type</p>
              <p className="mt-2 font-mono text-sm">{txtVerification.type}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Name</p>
              <p className="mt-2 font-mono text-sm">
                {txtVerification.domain.slice(
                  0,
                  txtVerification.domain.length -
                    domainJson.apexName.length -
                    1,
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Value</p>
              <p className="mt-2 font-mono text-sm">
                <span className="text-ellipsis">{txtVerification.value}</span>
              </p>
            </div>
          </div>
          <p className="text-sm dark:text-stone-400">
            Warning: if you are using this domain for another site, setting this
            TXT record will transfer domain ownership away from that site and
            break it. Please exercise caution when setting this record.
          </p>
        </>
      ) : status === "Unknown Error" ? (
        <p className="mb-5 text-sm dark:text-white">
          {domainJson.error.message}
        </p>
      ) : (
        <>
          {/* <div className="flex justify-start space-x-4">
            <button
              type="button"
              onClick={() => setRecordType("A")}
              className={`${
                recordType == "A"
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-white text-stone-400 dark:border-black dark:text-stone-600"
              } ease border-b-2 pb-1 text-sm transition-all duration-150`}
            >
              A Record{!subdomain && " (recommended)"}
            </button>
            <button
              type="button"
              onClick={() => setRecordType("CNAME")}
              className={`${
                recordType == "CNAME"
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-white text-stone-400 dark:border-black dark:text-stone-600"
              } ease border-b-2 pb-1 text-sm transition-all duration-150`}
            >
              ALIAS Record{subdomain && " (recommended)"}
            </button>
          </div> */}
          <div className="my-3 text-left ">
            <p className="my-5 text-sm dark:text-white ">
              To configure your apex domain (
              <InlineSnippet>
                {recordType === "A" ? domainJson.apexName : domainJson.name}
              </InlineSnippet>
              ), set the following ALIAS record on your DNS provider to
              continue:
             <span className="ml-2">
             <a href="https://blog.ensdom.com/blog/a-simple-for-sale-lander-for-box-namefi-domains" target="_blank" className="dark:text-gray-300 text-sm mb-1 lg:mb-0 underline text-black">Learn More</a>
              </span>
            </p>
            <div className="flex items-center justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
              <div>
                <p className="text-sm font-bold">Type</p>
                <p className="mt-2 font-mono text-sm">ALIAS</p>
              </div>
              <div>
                <p className="text-sm font-bold">Name</p>
                <p className="mt-2 font-mono text-sm">@</p>
              </div>
              <div>
                <p className="text-sm font-bold">Value</p>
                <p className="mt-2 font-mono text-sm">
                  {`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">TTL</p>
                <p className="mt-2 font-mono text-sm">3600</p>
              </div>
            </div>
            <p className="mt-5 text-sm dark:text-white">
              Note: for TTL, if <InlineSnippet>3600</InlineSnippet> is not
              available, set the highest value possible. Also, domain
              propagation can take up to an hour.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
