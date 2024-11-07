"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  SquareTerminal,
  Cross,
  Timer,
  User,
  PawPrint,
  Tent,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
      logo: PawPrint,
      plan: "Akelá",
    },
    {
      name: "Tropa Escoteira Schweitzer",
      logo: Tent,
      plan: "Instrutor",
    },
  ],
  navMain: [
    {
      title: "Dados pessoais",
      url: "/perfil",
      icon: User,
      items: [
        {
          title: "Dados básicos",
          url: "/perfil/dados-basicos",
          icon: Frame,
        },
        {
          title: "Histórico de atividades",
          url: "/perfil/historico",
          icon: Timer,
        },
        {
          title: "Progressão",
          url: "/perfil/progressao",
          icon: Map,
        },
        {
          title: "Ficha médica",
          url: "/perfil/ficha-medica",
          icon: Cross,
        },
      ],
    },
    {
      title: "Unidade Escoteira Local",
      url: "/unidade-local",
      icon: BookOpen,
      items: [
        {
          title: "Seções",
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
      title: "Atividades",
      url: "",
      icon: SquareTerminal,
      items: [
        { title: "Fichas de atividade", url: "/fichas-atividades" },
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
