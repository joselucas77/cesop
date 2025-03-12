"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      width: number;
      height: number;
      top: number;
      left: number;
      duration: number;
      delay: number;
      floatDuration: number;
    }>
  >([]);

  // Generate random elements only on the client after hydration
  useEffect(() => {
    const elements = Array.from({ length: 20 }, () => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      floatDuration: Math.random() * 10 + 10,
    }));

    setFloatingElements(elements);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Animated background elements - only rendered after client-side generation */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              top: `${element.top}%`,
              left: `${element.left}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
              animation: `float ${element.floatDuration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-3xl w-full text-center space-y-8 px-4">
        {/* 404 Text */}
        <h1 className="text-[150px] md:text-[200px] font-bold leading-none tracking-tighter text-primary">
          404
        </h1>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Search className="h-24 w-24 text-muted-foreground animate-pulse" />
            <span className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-4xl">
              ?
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Oops! Página não encontrada
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A página que você está procurando parece ter se perdido. Pode estar
            perdida no espaço digital ou nunca ter existido.
          </p>
        </div>

        {/* Button */}
        <div className="pt-4">
          <Button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95">
            <ArrowLeft className="h-4 w-4" />
            Voltar para a página anterior
          </Button>
        </div>
      </div>

      {/* Border animation */}
      <div className="absolute inset-0 border-animation" />
    </div>
  );
}
