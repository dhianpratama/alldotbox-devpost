import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav>
        <Suspense fallback={<div className="text-black dark:text-gray-300">Loading...</div>}>
          <Profile/>
        </Suspense>
      </Nav>
      {/* <div className="min-h-screen dark:bg-black sm:pl-60">{children}</div> */}
      <div className="min-h-screen dark:bg-black lg:pl-60">{children}</div>
    </div>
  );
}
