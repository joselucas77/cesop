"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FileCog,
  Folder,
  LogOut,
  LayoutDashboard,
  CircleUserRound,
  Users,
  ChevronRight,
  HelpCircle,
  ClipboardList,
  FilePen,
  Headset,
  PhoneCall,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { isActiveLink } from "@/utils/sidebarActive";
import { useAuth } from "@/contexts/auth-context";

const menuItemsByUser = {
  cidadao: [
    { href: "/portal/cidadao", icon: Home, label: "Principal" },
    {
      href: "/portal/cidadao/nova-requisicao",
      icon: FilePen,
      label: "Nova Requisição",
    },
    {
      href: "/portal/cidadao/requisicoes",
      icon: ClipboardList,
      label: "Requisições",
    },
    { href: "/portal/cidadao/ajuda", icon: HelpCircle, label: "Ajuda" },
  ],
  gestor: [
    { href: "/portal/gestor", icon: Home, label: "Principal" },
    {
      href: "/portal/gestor/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    { href: "/portal/gestor/usuarios", icon: Users, label: "Usuários" },
    { href: "/portal/gestor/servicos", icon: FileCog, label: "Serviços" },
  ],
  prefeitura: [
    { href: "/portal/prefeitura", icon: Home, label: "Principal" },
    {
      href: "/portal/prefeitura/requisicoes",
      icon: ClipboardList,
      label: "Requisições",
    },
    { href: "/portal/prefeitura/suporte", icon: Headset, label: "Suporte" },
  ],
  central: [
    { href: "/portal/central", icon: Home, label: "Principal" },
    {
      href: "/portal/central/atender-cidadao",
      icon: PhoneCall,
      label: "Atender Cidadão",
    },
    {
      href: "/portal/central/requisicoes",
      icon: ClipboardList,
      label: "Requisições",
    },
  ],
};

const reportGroups = [
  {
    title: "Relatórios Fixos",
    items: [
      {
        href: "/portal/gestor/relatorios/fixos/solicitacoes-servicos",
        label: "Solic. de Serviços",
      },
    ],
  },
  {
    title: "Relatórios Editáveis",
    items: [
      {
        href: "/portal/gestor/relatorios/editaveis/solicitacoes-cidadaos",
        label: "Solic. dos cidadãos",
      },
      {
        href: "/portal/gestor/relatorios/editaveis/servicos-localidades",
        label: "Serviço / localidade",
      },
    ],
  },
];

interface SidebarProps {
  userType: "cidadao" | "gestor" | "prefeitura" | "central";
}

export default function AppSidebar({ userType }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = menuItemsByUser[userType] || [];
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between mb-2">
            <SidebarGroupLabel className="tracking-widest">
              CESOP
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveLink(pathname, item.href)}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => router.prefetch(item.href)}>
                      <item.icon className="shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {userType === "gestor" && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip="Relatórios"
                        className="w-full justify-between">
                        <div className="flex items-center gap-2">
                          <Folder className="shrink-0 w-4 h-4" />
                          <span>Relatórios</span>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {reportGroups.map((group) => (
                          <div key={group.title}>
                            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                              {group.title}
                            </div>
                            {group.items.map((item) => (
                              <SidebarMenuSubItem
                                key={item.href}
                                className="py-0.5">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActiveLink(pathname, item.href)}>
                                  <Link href={item.href}>{item.label}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </div>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActiveLink(pathname, `/portal/${userType}/perfil`)}>
              <Link href={`/portal/${userType}/perfil`}>
                <CircleUserRound className="shrink-0" />
                <span>Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="shrink-0" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
