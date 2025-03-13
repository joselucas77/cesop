"use client";
import { Undo2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackPage() {
  const pathname = usePathname();

  const urlArray = [
    "/portal/cidadao/requisicoes/",
    "/portal/prefeitura/requisicoes/",
    "/portal/central/requisicoes/",
    "/portal/central/chamados/",
    "/portal/gestor/usuarios/",
  ];

  const checkUrlMatch = (urls: string[], currentPath: string): boolean => {
    return urls.some((url) => currentPath.startsWith(url));
  };

  const goBack = checkUrlMatch(urlArray, pathname);

  if (goBack) {
    return (
      <div className="absolute top-4 left-20">
        <Button
          variant="outline"
          size="default"
          className=""
          onClick={() => window.history.back()}>
          <Undo2 /> Voltar
        </Button>
      </div>
    );
  }
}
