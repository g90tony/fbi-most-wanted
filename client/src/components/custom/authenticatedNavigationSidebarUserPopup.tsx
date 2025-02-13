import { ChevronDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DEAUTHENTICATE_USER } from "@/state/slices/authStateSlice";
import { useDispatch } from "react-redux";

export function AuthenticatedNavigationSidebarUserPopup({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();

  function handleLogOut() {
    dispatch(DEAUTHENTICATE_USER());
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-row justify-end w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-zinc-950 text-zinc-700 bg-zinc-900 rounded-full data-[state=open]:text-zinc-800 hover:bg-zinc-950 hover:text-zinc-800 w-auto h-12"
            >
              <p className="capitalize hover:text-zinc-600 font-bold rounded-lg">{`${
                String(user.name).split(" ")[0][0]
              }${String(user.name).split(" ")[1][0]}`}</p>
              <ChevronDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-0 border-0 bg-zinc-900 p-0 gap-0"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal p-0">
              <div className="flex flex-col items-center !bg-zinc-950/50  gap-2 px-2 py-2 text-left text-sm">
                <div className="flex flex-col w-full text-left text-sm leading-tight ">
                  <span className="truncate text-sm text-white font-bold mb-1">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-zinc-300">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleLogOut}
              className="bg-rose-600 hover:!bg-rose-950 text-white border-[0px] font-bold h-10 my-0"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
