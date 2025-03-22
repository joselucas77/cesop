"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  PhoneCall,
  Headset,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import WhatsAppSupport from "@/components/layout/support";

export default function CentralHome() {
  const [hasNewNotification] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Bem-vindo, Central
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requisições em Andamento (Atual)
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+12 mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atendimentos Hoje
            </CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+8 ontem</p>
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chamados em Andamento
            </CardTitle>
            <Headset className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+12 mês passado</p>
          </CardContent>
        </Card>
        <Card className="col-span-full md:col-span-2">
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
                    <Badge>1 semana atrás</Badge>
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
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 flex-col">
            <Button>
              <Link href="/portal/central/atender-cidadao">
                Atender Cidadão
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/portal/central/requisicoes">Ver Requisições</Link>
            </Button>
            <Button variant="outline">
              <Link href="/portal/central/perfil">Acessar Perfil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <WhatsAppSupport />
    </div>
  );
}
