import {
  CalendarIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  ScanIcon,
  SettingsIcon,
  TicketIcon,
  UsersIcon
} from "@/components/ui/Icons";
import { DashboardNavItem } from "@/types";

export const navItems = [
  { name: "Home", link: "/#home" },
  { name: "About", link: "/#about" },
  { name: "Contact", link: "/#contact" },
  { name: "Login", link: "/login" },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];

export const dashboardNavItems: DashboardNavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboardIcon,
    srText: "Dashboard",
    name: "Dashboard",
  },
  {
    href: "/dashboard/events",
    icon: CalendarIcon,
    srText: "Events",
    name: "Events",
  },
  {
    href: "/dashboard/tickets",
    icon: TicketIcon,
    srText: "Tickets",
    name: "Tickets",
  },
  {
    href: "/dashboard/participants",
    icon: UsersIcon,
    srText: "Participants",
    name: "Participants",
  },
  {
    href: "/dashboard/scan",
    icon: ScanIcon,
    srText: "Scan",
    name: "Scan",
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    srText: "Settings",
    name: "Settings",
  },
];


export const adminDashboardNavItems: DashboardNavItem[] = [
  {
    href: "/admin",
    icon: LayoutDashboardIcon,
    srText: "Dashboard",
    name: "Dashboard",
  },
  {
    href: "/admin/events",
    icon: CalendarIcon,
    srText: "Events",
    name: "Events",
  },
  {
    href: "/admin/payments",
    icon: DollarSignIcon,
    srText: "Payments",
    name: "Payments",
  },
  {
    href: "/admin/settings",
    icon: SettingsIcon,
    srText: "Settings",
    name: "Settings",
  },
];