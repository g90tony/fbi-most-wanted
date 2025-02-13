"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCallback } from "react";

export default function AuthenticatedNavigationSidebarMainIContainer({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const router = useNavigate();
  const location = useLocation();

  const isActive = useCallback(
    (index: number) => {
      return location !== null && location.pathname === items[index].url
        ? true
        : false;
    },
    [items, location]
  );

  return (
    <SidebarGroup className="!bg-zinc-950">
      <SidebarMenu className="!bg-zinc-950">
        {items.map((item, index) => (
          <SidebarMenuItem key={index} className="!bg-zinc-950">
            <SidebarMenuButton asChild tooltip={item.title}>
              <Button
                className={cn(
                  "bg-zinc-950 hover:bg-zinc-900 hover:text-700 cursor-pointer p-2 rounded-lg",
                  isActive(index) ? "text-blue-500 bg-black" : "text-zinc-400"
                )}
                onClick={() =>
                  router(item.url, {
                    state: { trigger: "user" },
                  })
                }
              >
                <div className="flex flex-row justify-start items-center w-100 h-auto gap-2">
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
