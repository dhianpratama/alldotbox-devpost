"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function UnpublishSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <button
      onClick={() => modal?.show(children)}
      className="w-full text-left block px-4 py-2 text-sm  font-semibold hover:bg-stone-200 dark:hover:bg-red-200 dark:hover:text-red-700"
    >
      Unpublish Site
    </button>
  );
}
