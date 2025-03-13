"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export default function Suporte() {
  const [motivoChamado, setMotivoChamado] = useState("");
  const [protocolo, setProtocolo] = useState("");
  const [detalhes, setDetalhes] = useState("");

  const today = format(new Date(), "Pp", { locale: ptBR });
  const msg = `Enviado ${today}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Chamado enviado:", { motivoChamado, protocolo, detalhes });
    toast.success("Chamado enviado com sucesso!", {
      description: msg,
      action: {
        label: "Fechar",
        onClick: () => console.log("Fechar"),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">Suporte</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Abrir Chamado de Suporte</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo do Chamado</Label>
              <Select value={motivoChamado} onValueChange={setMotivoChamado}>
                <SelectTrigger id="motivo">
                  <SelectValue placeholder="Selecione o motivo do chamado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ajuda_solicitacao">
                    Ajuda com uma solicitação
                  </SelectItem>
                  <SelectItem value="ajuda_tecnica">
                    Ajuda técnica do sistema
                  </SelectItem>
                  <SelectItem value="sugestao">Sugestão de melhoria</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {motivoChamado === "ajuda_solicitacao" && (
              <div className="space-y-2">
                <Label htmlFor="protocolo">Número do Protocolo</Label>
                <Input
                  id="protocolo"
                  placeholder="Digite o número do protocolo"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="detalhes">Detalhes do Chamado</Label>
              <Textarea
                id="detalhes"
                placeholder="Descreva em detalhes o seu problema ou solicitação"
                value={detalhes}
                onChange={(e) => setDetalhes(e.target.value)}
                rows={5}
              />
            </div>

            <Button type="submit">Enviar Chamado</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
