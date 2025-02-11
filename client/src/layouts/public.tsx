import PublicNavigationBar from "@/components/custom/publicNavigationBar";

import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="flex flex-col justify-start items center h-screen w-screen overflow-hidden">
      <PublicNavigationBar />
      <div className="flex flex-col justify-start items center h-screen w-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
