"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const visibleRoutes = [
  "/portal/cidadao",
  "/portal/prefeitura",
  "/portal/central",
  "/portal/gestor",
];

export default function WhatsAppSupport() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const phoneNumber = "+557998705277";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  useEffect(() => {
    setIsVisible(visibleRoutes.includes(pathname));
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="ghost"
              className="w-14 h-14 p-0 rounded-full bg-green-500 hover:bg-green-600 shadow-lg animate-bounce">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer">
                <FaWhatsapp className="text-white text-3xl" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Suporte</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
