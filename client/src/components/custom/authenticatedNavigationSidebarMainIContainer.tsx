"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

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
  return (
    <SidebarGroup className="!bg-zinc-950">
      <SidebarMenu className="!bg-zinc-950">
        {items.map((item, index) => (
          <SidebarMenuItem key={index} className="!bg-zinc-950">
            <SidebarMenuButton
              className="!bg-zinc-950"
              asChild
              tooltip={item.title}
            >
              <NavLink
                className={(isActive) =>
                  cn(isActive ? "text-blue-500" : "text-zinc-400")
                }
                to={item.url}
              >
                <item.icon />
                <span>{item.title}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
