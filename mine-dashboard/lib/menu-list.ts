import {
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutDashboard,
  Server,
  SquareTerminal,
  Map,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutDashboard,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Servers",
      menus: [
        {
          href: "/shell",
          label: "Shell",
          active: pathname.includes("/shell"),
          icon: SquareTerminal,
          submenus: [],
        },
        {
          href: "",
          label: "Servers",
          active: pathname.includes("/server"),
          icon: Server,
          submenus: [
            {
              href: "/server/create",
              label: "Creation",
              active: pathname === "/server/create",
            },
            {
              href: "/server/manage",
              label: "Managment",
              active: pathname === "/server/managment",
            },
            {
              href: "/configuration",
              label: "Configuration",
              active: pathname === "/server",
            },
          ],
        },
        {
          href: "/maps",
          label: "Maps",
          active: pathname.includes("/ma"),
          icon: Map,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
