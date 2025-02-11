import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

import logo from "../../assets/fbi-logo.png";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

export default function PublicNavigationBar() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-[100px] px-12">
      <a href="/">
        <img
          src={logo}
          alt="FBI Logo"
          className="block w-16 h-16 rounded-full object-cover"
        />
      </a>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row justify-end items-center w-auto gap-4">
          <NavigationMenuItem>
            <NavLink
              className={({ isActive }) =>
                cn(
                  " text-center text-md font-bold ",
                  isActive
                    ? "text-blue-400 hover:text-blue-950 "
                    : "text-gray-400 hover:text-blue-100"
                )
              }
              to="/sign-in"
            >
              Sign In
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              className={({ isActive }) =>
                cn(
                  "text-white hover:text-blue-400 text-center text-md font-bold",
                  isActive
                    ? "text-blue-400 hover:text-blue-950 "
                    : "text-gray-400 hover:text-blue-100"
                )
              }
              to="/sign-up"
            >
              Sign Up
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
