"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/static/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 bg-slate-950 text-white">
        <div className="container mx-auto pl-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CESOP</h1>
          <div className="flex gap-2">
            <Button asChild variant="default">
              <Link href="/login/cidadao">Cidadão</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/login/prefeitura">Área da Prefeitura</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-12 md:py-2">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto mb-8">
              <CardContent className="text-center p-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bem-vindo ao Centro De Serviços de Operações da Prefeitura
                </h2>
                <p className="text-lg">
                  O CESOP é um sistema integrado que facilita a comunicação
                  entre cidadãos e a prefeitura, agilizando o processo de
                  requisições e melhorando a gestão dos serviços municipais.
                </p>
              </CardContent>
            </Card>
            <div className="max-w-3xl mx-auto">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src="https://www.youtube.com/embed/ruMwOZUw6q8?si=f4knyxJZJgHyAvsE"
                  title="Vídeo de apresentação do CESOP"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"></iframe>
              </AspectRatio>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sobre o CESOP</h3>
              <p className="text-sky-200">
                O Centro De Serviços de Operações da Prefeitura (CESOP) é um
                sistema integrado que visa melhorar a comunicação entre cidadãos
                e a administração municipal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/login/cidado"
                    className="text-sky-200 hover:text-white transition-colors">
                    Portal Cidadão
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login/prefeitura"
                    className="text-sky-200 hover:text-white transition-colors">
                    Portal Prefeitura
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sky-200 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contato</h3>
              <p className="text-sky-200 mb-2">Telefone: (79) 99870-5277</p>
              <p className="text-sky-200 mb-2">Email: igestor@cesop.com.br</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-sky-700 text-center text-sky-300">
            <p>
              &copy; {new Date().getFullYear()} CESOP. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
