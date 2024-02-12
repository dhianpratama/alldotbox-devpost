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
      className="block px-4 py-2 text-sm hover:bg-stone-200 dark:hover:bg-stone-600 dark:hover:text-white"
    >
      Unpublish Site
    </button>
  );
}
