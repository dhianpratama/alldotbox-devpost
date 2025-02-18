"use client";

import { useEffect, useState } from "react";
import { useDomainStatus } from "./use-domain-status";
import { getSubdomain } from "@/lib/domains";
import { AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRegistryByContract, registry, reservoir } from "@/lib/config";

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
  contract,
}: {
  domain: string;
  subdomain: string;
  contract: string;
}) {
  const [recordType, setRecordType] = useState<"A" | "ALIAS">("ALIAS");

  const { status, domainJson } = useDomainStatus({ domain });

  useEffect(() => {
    // hide sidebar on path change
    const tld = domain?.split(".").pop();
    if (tld === "box") {
      setRecordType("ALIAS");
    } else if (contract === reservoir[registry.NAMEFI].contract) {
      setRecordType("A");
    } else if (contract === reservoir[registry.UD_ETH].contract) {
      setRecordType("A");
    } else if (contract === reservoir[registry.UD_POLYGON].contract) {
      setRecordType("A");
    } else if (contract === reservoir[registry.THREEDNS].contract) {
      setRecordType("ALIAS");
    }
  }, [contract]);

  if (!status || status === "Valid Configuration" || !domainJson) return null;

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
         
          <div className="my-3 text-left">
            <p className="my-5 text-sm dark:text-white">
              To configure your{" "}
              {recordType === "A" ? "apex domain" : "subdomain"} (
              <InlineSnippet>
                {recordType === "A" ? domainJson.apexName : domainJson.name}
              </InlineSnippet>
              ), set the following {recordType} record on your DNS provider to
              continue:
            </p>
            <div className="flex items-center justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
              <div>
                <p className="text-sm font-bold">Type</p>
                <p className="mt-2 font-mono text-sm">{recordType}</p>
              </div>
              <div>
                <p className="text-sm font-bold">Name</p>
                <p className="mt-2 font-mono text-sm">
                  {/* {recordType === "A" ? "@" : subdomain ?? "www"} */}@
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">Value</p>
                <p className="mt-2 font-mono text-sm">
                  {recordType === "A"
                    ? `76.76.21.21`
                    : `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">TTL</p>
                <p className="mt-2 font-mono text-sm">86400</p>
              </div>
            </div>
            <p className="mt-5 text-sm dark:text-white">
              Note: for TTL, if <InlineSnippet>86400</InlineSnippet> is not
              available, set the highest value possible. Also, domain
              propagation can take up to an hour.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
