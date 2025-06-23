"use client";

import * as React from "react";
import {
  AudioWaveform,
  BadgePercent,
  BookOpen,
  Bot,
  BotIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  Gauge,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

// This is sample data.
const data1 = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
    },
    {
      name: "Bot",
      url: "/dashboard/services",
      icon: BotIcon,
    },
    {
      name: "Plans",
      url: "/dashboard/plans",
      icon: BadgePercent,
    },
    {
      name: "Wallet",
      url: "/dashboard/wallet",
      icon: Wallet,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const user = {
    name: session?.user?.name ?? "Anonymous",
    email: session?.user?.email ?? "no-email@example.com",
    image: session?.user?.image ?? "",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data1.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain projects={data1.navMain} />
        {/* <NavProjects /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
