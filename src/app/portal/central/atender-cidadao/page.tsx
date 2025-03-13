"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AtenderCidadao() {
  const [opcao, setOpcao] = useState("");
  const [protocolo, setProtocolo] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (opcao === "criar") {
      console.log("Nova requisição criada:", {
        nome,
        telefone,
        tipoServico,
        descricao,
        file,
      });
      alert("Nova requisição criada com sucesso!");
    } else if (opcao === "verificar") {
      console.log("Verificando requisição:", { protocolo, cpf });
      alert("Verificação de requisição realizada!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Atendimento ao Cidadão
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Opções de Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={opcao} onValueChange={setOpcao}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="criar">Criar nova requisição</SelectItem>
                <SelectItem value="verificar">
                  Verificar requisição existente
                </SelectItem>
              </SelectContent>
            </Select>

            {opcao === "criar" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Cidadão</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                  <Select value={tipoServico} onValueChange={setTipoServico}>
                    <SelectTrigger id="tipoServico">
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iptu">IPTU</SelectItem>
                      <SelectItem value="obras">
                        Obras e Infraestrutura
                      </SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição da Requisição</Label>
                  <Textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Arquivo</Label>
                  <Input
                    id="file"
                    type="file"
                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                    className="cursor-pointer"
                  />
                </div>
              </>
            )}

            {opcao === "verificar" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="protocolo">Número do Protocolo</Label>
                  <Input
                    id="protocolo"
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF do Cidadão</Label>
                  <Input
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
              </>
            )}

            <Button type="submit">
              {opcao === "criar"
                ? "Criar Requisição"
                : opcao === "verificar"
                ? "Verificar Requisição"
                : "Enviar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
