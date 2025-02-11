import { AuthenticatedNavigationSidebar } from "@/components/custom/authenticatedNavigationSidebar";
import { AuthenticatedNavigationSidebarUserPopup } from "@/components/custom/authenticatedNavigationSidebarUserPopup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

import { Outlet } from "react-router";

const user = {
  avatar: "",
  email: "calebmbugua@gmail.com",
  name: "Caleb Mbugua",
};

export default function AuthLayout() {
  return (
    <div className="bg-black p-0 m-0 w-screen h-screen overflow-hidden">
      <SidebarProvider>
        <AuthenticatedNavigationSidebar />
        <SidebarInset>
          <header className="flex flex-row justify-end w-full h-16 shrink-0 items-center gap-0 bg-black">
            <div className="flex items-center gap-0 px-4 bg-zinc-700 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList className="text-primary-400">
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink className="font-bold" href="/dashboard">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {/* <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="text-primary-400">
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem> */}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <AuthenticatedNavigationSidebarUserPopup user={user} />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-black overflow-y-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
