"use client";

import { useEffect, useState } from "react";

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const stats: Stat[] = [
  { value: 100, label: "Empresas ativas", suffix: "+" },
  { value: 5, label: "Mil mensagens/dia", suffix: "k+" },
  { value: 98, label: "Satisfação dos clientes", suffix: "%" },
];

export function StatsSection() {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.value / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                  current = stat.value;
                  clearInterval(timer);
                }
                setCounters((prev) => {
                  const newCounters = [...prev];
                  newCounters[index] = Math.floor(current);
                  return newCounters;
                });
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      className="py-20 bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient-shift"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {counters[index]}
                <span className="text-white/90">{stat.suffix}</span>
              </div>
              <p className="text-white/90 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
