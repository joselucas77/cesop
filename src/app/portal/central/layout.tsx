import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import BackPage from "@/components/layout/back-page";
import AppSidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "CESOP - Central",
};

export default async function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar userType="central" />
      <Card className="relative w-full m-2">
        <CardContent className="w-full">
          <SidebarTrigger />
          <BackPage />
          <main className="container mx-auto py-4 overflow-hidden">
            {children}
          </main>
        </CardContent>
      </Card>
    </SidebarProvider>
  );
}
