"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HelpContent() {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const isMobile = useIsMobile();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your server
    console.log("Feedback submitted:", feedbackMessage);
    toast("Feedback enviado!", {
      description: "Obrigado por sua contribuição",
      action: {
        label: "Fechar",
        onClick: () => console.log("Fechar"),
      },
    });
    setFeedbackMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Central de Ajuda
        </h1>
      </div>
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 gap-y-4 md:pag-y-0 md:grid-cols-4 mb-16 md:mb-0">
          <TabsTrigger value="faq">Perguntas</TabsTrigger>
          <TabsTrigger value="navigation">Navegação</TabsTrigger>
          {isMobile ? (
            <div
              hidden={isMobile}
              className="inline-flex w-full col-span-2 h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="feedback" className="w-full text-center">
                Feedback
              </TabsTrigger>
              <TabsTrigger value="contact" className="w-full text-center">
                Contato
              </TabsTrigger>
            </div>
          ) : (
            <>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="faq">
          <Card>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="status-deferido">
                  <AccordionTrigger>
                    O que significa quando uma requisição está com status
                    &quot;Deferido&quot;?
                  </AccordionTrigger>
                  <AccordionContent>
                    Quando uma requisição está com o status
                    &quot;Deferido&quot;, significa que ela foi analisada e
                    aprovada. Sua solicitação foi aceita e será processada ou já
                    foi concluída.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="status-indeferido">
                  <AccordionTrigger>
                    O que significa quando uma requisição está com status
                    &quot;Indeferido&quot;?
                  </AccordionTrigger>
                  <AccordionContent>
                    O status &quot;Indeferido&quot; indica que sua requisição
                    foi analisada, mas não foi aprovada. Isso pode ocorrer por
                    diversos motivos, como falta de documentação ou não
                    atendimento aos critérios necessários. Você pode entrar em
                    contato conosco para mais informações sobre o motivo do
                    indeferimento.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="status-em-andamento">
                  <AccordionTrigger>
                    O que significa quando uma requisição está com status
                    &quot;Em Andamento&quot;?
                  </AccordionTrigger>
                  <AccordionContent>
                    Quando uma requisição está &quot;Em Andamento&quot;,
                    significa que ela foi recebida e está sendo processada ou
                    analisada pela equipe responsável. O tempo de processamento
                    pode variar dependendo da complexidade da solicitação.
                  </AccordionContent>
                </AccordionItem>
                {/* Add more FAQ items as needed */}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="navigation">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg phone:text-xl">
                Instruções de Navegação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm phone:text-base">
                <li>
                  Para acessar suas requisições, clique em &quot;Minhas
                  Requisições&quot; no menu principal.
                </li>
                <li>
                  Para criar uma nova requisição, use o botão &quot;Nova
                  Requisição&quot; na página inicial.
                </li>
                <li>
                  Você pode atualizar seu perfil clicando no seu nome no canto
                  superior direito e selecionando &quot;Perfil&quot;.
                </li>
                <li>
                  Para ver notificações, clique no ícone de sino no cabeçalho.
                </li>
                <li>
                  Esta página de ajuda pode ser acessada a qualquer momento
                  através do link &quot;Ajuda&quot; no rodapé do site.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg phone:text-xl">
                Envie seu Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <Textarea
                  placeholder="Compartilhe suas sugestões ou relate problemas"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
                <Button type="submit" className="w-full phone:w-auto">
                  Enviar Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg phone:text-xl">
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm phone:text-base">
              <p className="mb-2">
                <strong>Telefone:</strong> (79) 9870-5277
              </p>
              <p className="mb-2">
                <strong>E-mail:</strong> suporte@cesop.site
              </p>
              <p className="mb-2">
                <strong>Horário de Atendimento:</strong> Segunda a Sexta, das 8h
                às 18h
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
