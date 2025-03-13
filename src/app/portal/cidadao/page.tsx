"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  AlertCircle,
  CheckCircle2,
  Clock,
  CircleX,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Requests } from "@prisma/client";
import { verifySession } from "@/lib/auth";
import { getUserById } from "@/lib/api/users";
import { getRequestByUserId } from "@/lib/api/requests";
import LoadingAnimation from "@/app/loading";

interface UserData {
  name: string;
  requests: Requests[];
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNewNotification] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await verifySession();

        const [requests, user] = await Promise.all([
          getRequestByUserId(Number(userId)),
          getUserById(userId),
        ]);

        setUserData({
          name: user.name,
          requests: requests,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(
          "Ocorreu um erro ao carregar os dados. Por favor, tente novamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error || !userData) {
    return (
      <div className="text-center text-red-500">
        {error || "Erro ao carregar dados."}
      </div>
    );
  }

  const { name, requests } = userData;

  function getFirstName(fullName: string): string {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
  }

  const requestsPending = requests.filter(
    (request) => request.status === "PENDING"
  ).length;

  const requestsInProgress = requests.filter(
    (request) => request.status === "IN_PROGRESS"
  ).length;

  const requestsRejected = requests.filter(
    (request) => request.status === "REJECTED"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Bem-vindo, {getFirstName(name)}
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requisições Deferidas (Hoje)
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requestsPending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requisições Em Andamento (Hoje)
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requestsInProgress}</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-full lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requisições Indeferidas (Hoje)
            </CardTitle>
            <CircleX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requestsRejected}</div>
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
                <TabsTrigger
                  value="notifications"
                  className="relative
                ">
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
            <Button asChild>
              <Link href="/portal/cidadao/nova-requisicao">
                Nova Requisição
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/portal/cidadao/requisicoes">Ver Requisições</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/portal/cidadao/perfil">Atualizar Perfil</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/portal/cidadao/ajuda">Ajuda</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
