"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  SquareTerminal,
  Cross,
  Timer,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "User",
    email: "x@escoteiros.org.br",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Alcateia Albert Schweitzer",
      logo: GalleryVerticalEnd,
      plan: "Akelá",
    },
    {
      name: "Tropa Escoteira Schweitzer",
      logo: AudioWaveform,
      plan: "Instrutor",
    },
  ],
  navMain: [
    {
      title: "Atividades",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Calendário",
          url: "#",
        },
        {
          title: "Atividades especiais",
          url: "#",
        },
        {
          title: "Eventos",
          url: "#",
        },
      ],
    },
    {
      title: "Associados",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Fichas",
          url: "#",
        },
        {
          title: "Registro",
          url: "#",
        },
      ],
    },
    {
      title: "Unidade Escoteira Local",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
  ],
  personal: [
    {
      name: "Informações pessoais",
      url: "#",
      icon: Frame,
    },
    {
      name: "Histórico de atividades",
      url: "#",
      icon: Timer,
    },
    {
      name: "Progressão",
      url: "#",
      icon: Map,
    },
    {
      name: "Ficha médica",
      url: "#",
      icon: Cross,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.personal} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
