import { BadgeCheck, ChevronDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AuthenticatedNavigationSidebarUserPopup({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-row justify-end w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-zinc-800 data-[state=open]:text-white hover:bg-black hover:text-white w-auto"
            >
              <Avatar className="h-8 w-8 rounded-lg text-white">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  className="text-white"
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              {/* <div className="grid flex-1 text-left text-sm leading-tight  text-white">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div> */}
              <ChevronDown className="ml-auto size-4 text-white" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-0 bg-zinc-900 gap-4 py-2"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal p-0">
              <div className="flex flex-col items-center !bg-zinc-800 rounded-lg gap-2 px-2 py-2 text-left text-sm">
                <div className="flex flex-col w-full text-left text-sm leading-tight ">
                  <span className="truncate text-sm font-bold mb-1">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-zinc-500">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:!bg-black text-white font-bold ">
                <BadgeCheck />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:!bg-rose-600 hover:text-white text-rose-600 font-bold">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
