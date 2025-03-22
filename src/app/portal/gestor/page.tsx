"use client";

import WhatsAppSupport from "@/components/layout/support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  MapPinned,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [hasNewNotification] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Bem-vindo, Gestor
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requisições
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requisições em Andamento
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">46.4% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requisições Concluídas
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">621</div>
            <p className="text-xs text-muted-foreground">50.3% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bairros Atendidos
            </CardTitle>
            <MapPinned className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              80% dos bairros da cidade
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="requests">Requisições</TabsTrigger>
                <TabsTrigger value="notifications" className="relative">
                  Notificações
                  {hasNewNotification && (
                    <div className="absolute -top-1.5 -right-1.5">
                      <span className="relative flex">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                    </div>
                  )}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ul className="space-y-4 mt-4">
                  <li className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span className="flex-1">Nova solicitação enviada</span>
                    <Badge>2 dias atrás</Badge>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span className="flex-1">Requisição #1234 finalizada</span>
                    <Badge variant="default">1 semana atrás</Badge>
                  </li>
                  <li className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span className="flex-1">
                      Notificação importante recebida
                    </span>
                    <Badge>2 semanas atrás</Badge>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="requests">
                <ul className="space-y-4 mt-4">
                  <li className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span className="flex-1">Nova solicitação enviada</span>
                    <Badge>2 dias atrás</Badge>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span className="flex-1">Requisição #1234 finalizada</span>
                    <Badge>1 semana atrás</Badge>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="notifications">
                <ul className="space-y-4 mt-4">
                  <li className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span className="flex-1">
                      Notificação importante recebida
                    </span>
                    <Badge>2 semanas atrás</Badge>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>
              <Link href="/portal/gestor/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline">
              <Link href="/portal/gestor/usuarios">Usuários</Link>
            </Button>
            <Button variant="outline">
              <Link href="/portal/gestor/servicos">Serviços</Link>
            </Button>
            <Button variant="outline">
              <Link href="/portal/gestor/perfil">Perfil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <WhatsAppSupport />
    </div>
  );
}
