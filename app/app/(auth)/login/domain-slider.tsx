import React, { ReactNode, useState } from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DomainSlider() {
  let data;

  try {
    const _data = await prisma.site.findMany({
      where: {
        NOT: {
          customDomain: null,
        },
      },
      select: {
        customDomain: true,
        image: true,
        title: true,
        description: true,
      },
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    });
    data = _data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      {/* <div className="mb-4 h-[20vh] md:h-[10vh] xl:h-[20vh] w-full overflow-hidden"> */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-2">
          <div
            className="flex animate-infinite-scroll items-center justify-between gap-2 "
            style={{
              animationDuration: "90s",
            }}
          >
            {data
              ?.filter((d :any) => d?.image)
              .map((d:any, i:number) => {
                return (
                  <Link
                    href={`https://${d?.customDomain ? d.customDomain : "#"}`}
                    key={i}
                    className="relative flex h-[100px] w-[250px]  justify-center rounded-lg px-1 border border-gray-400"
                    target="_blank"
                  >
                    <img
                      src={d?.image || "/slider_1.jpg"}
                      alt=""
                      className="h-full w-full object-cover opacity-[0.4]"
                    />
                    <div className="absolute flex flex-col justify-center p-[0.8rem]  text-white ">
                      <p className="text-2xl font-semibold">
                        {d?.customDomain}
                      </p>

                      {/* <p className="text-base font-semibold ">{d?.title}</p> */}
                      <p className="w-48 truncate text-sm ">
                        {d?.description || d?.customDomain}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>

          <div
            className="flex animate-infinite-scroll items-center justify-between gap-2 "
            style={{
              animationDuration: "90s",
            }}
          >
            {data
              ?.filter((d:any) => d?.image)
              .map((d:any, i:number) => {
                return (
                  <Link
                    href={`https://${d?.customDomain ? d.customDomain : "#"}`}
                    target="_blank"
                    key={i}
                    className="relative flex h-[100px] w-[250px]  justify-center rounded-lg px-1 border border-gray-400"
                  >
                    <img
                      src={d?.image || "/slider_1.jpg"}
                      alt=""
                      className="h-full w-full object-cover opacity-[0.4]"
                    />
                    <div className="absolute flex flex-col justify-center p-[0.8rem]  text-white ">
                      <p className="text-2xl font-semibold">
                        {d?.customDomain}
                      </p>

                      {/* <p className="text-base font-semibold ">{d?.title}</p> */}
                      <p className="w-48 truncate text-sm ">
                        {d?.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
