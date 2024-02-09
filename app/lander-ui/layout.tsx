import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import CTA from "@/components/cta";
import ReportAbuse from "@/components/report-abuse";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import Head from "next/head";

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const title = "Cyber.Box";
  const subTitle =
    "This is a Web2 + Web3 domain name, and the domain name is on sale.";
  const ogImage = "og-image.png";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subTitle} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subTitle} />
        <meta property="og:image" content={`/${ogImage}`} />
      </Head>
      <div className="mt-20">{children}</div>
    </div>
  );
}
