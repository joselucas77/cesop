"use client";

import { useState, useEffect } from "react";
import { Clock, Mail, Wrench, RefreshCw } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function MaintenancePage() {
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

  const [countdown, setCountdown] = useState({
    hours: 4,
    minutes: 0,
    seconds: 0,
  });

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

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let newHours = prev.hours;
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-zinc-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
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
        {/* Maintenance Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-zinc-800 flex items-center justify-center">
              <Wrench className="h-12 w-12 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-white animate-spin" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Site Em Manutenção
        </h1>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-zinc-300 max-w-md mx-auto text-lg">
            Nós estamos atualmente realizando manutenção programada em nosso
            site para melhorar sua experiência.
          </p>
          <p className="text-zinc-400 max-w-md mx-auto">
            Por favor, volte mais tarde. Pedimos desculpas por qualquer
            inconveniente.
          </p>
        </div>

        {/* Countdown */}
        <div className="pt-6">
          <p className="text-zinc-400 mb-2 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            Estimativa de conclusão em:
          </p>
          <div className="flex justify-center gap-4 text-white">
            <div className="bg-zinc-800/50 px-4 py-3 rounded-lg w-20">
              <div className="text-2xl font-bold">
                {countdown.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-zinc-400">Horas</div>
            </div>
            <div className="bg-zinc-800/50 px-4 py-3 rounded-lg w-20">
              <div className="text-2xl font-bold">
                {countdown.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-zinc-400">Minutos</div>
            </div>
            <div className="bg-zinc-800/50 px-4 py-3 rounded-lg w-20">
              <div className="text-2xl font-bold">
                {countdown.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-zinc-400">Segundos</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="pt-6">
          <p className="text-zinc-400 mb-4">Precisa de assistência imediata?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="igestor@cesop.com.br"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 text-zinc-900 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95">
              <Mail className="h-4 w-4" />
              Email
            </a>
            <Link
              href="https://wa.me/+557998705277"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95">
              <FaWhatsapp className="h-4 w-4" />
              Whatsapp
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.8;
          }
        }

        @property --a {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .border-wrapper {
          position: absolute;
          inset: 0;
          background: repeating-conic-gradient(
            from var(--a),
            #ffffff 0%,
            #ffffff 5%,
            transparent 5%,
            transparent 40%,
            #ffffff 50%
          );
          animation: rotate 4s linear infinite;
          z-index: 1;
        }

        .border-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-conic-gradient(
            from var(--a),
            #000000 0%,
            #000000 5%,
            transparent 5%,
            transparent 40%,
            #000000 50%
          );
          animation: rotate 4s linear infinite -1s;
          z-index: 1;
        }

        .border-wrapper::after {
          content: "";
          position: absolute;
          inset: 8px;
          background-color: #18181b; /* zinc-900 */
          z-index: 2;
        }

        @keyframes rotate {
          0% {
            --a: 0deg;
          }
          100% {
            --a: 360deg;
          }
        }
      `}</style>
    </div>
  );
}
