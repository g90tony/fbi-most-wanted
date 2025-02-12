import * as React from "react";
import { Eye, HomeIcon, List } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AuthenticatedNavigationSidebarMainIContainer from "./authenticatedNavigationSidebarMainIContainer";

import logo from "../../assets/fbi-logo.png";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Wanted Categories",
      url: "/wanted-categories",
      icon: List,
    },
    {
      title: "My Watch List",
      url: "/my-list",
      icon: Eye,
    },
  ],
};

export function AuthenticatedNavigationSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" className="!bg-zinc-950" {...props}>
      <SidebarHeader className="!bg-zinc-950">
        <SidebarMenu className="!bg-zinc-950">
          <SidebarMenuItem className="!bg-zinc-950">
            <SidebarMenuButton className="!bg-zinc-950" size="lg" asChild>
              <div className="!bg-zinc-950">
                <div className="flex flex-row w-auto h-auto aspect-square size-8 items-center justify-center rounded-lg !bg-zinc-950 text-sidebar-primary-foreground">
                  <img
                    src={logo}
                    alt="FBI Logo"
                    className="w-12 h-12 object-cover rounded-full !bg-zinc-950 p-0"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight !bg-zinc-950 text-white">
                  <span className="truncate text-lg font-bold text-blue-500">
                    FBI
                  </span>
                  <span className="truncate font-semibold text-xs">
                    Most Wanted
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="!bg-zinc-950 text-blue-400 font-semibold">
        <AuthenticatedNavigationSidebarMainIContainer items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
