import { useEffect, useRef, useState } from "react";
import { stats, certificationLogos, type StatItem } from "@/data/mockData";

interface TrustSectionProps {
  items?: StatItem[];
  certifications?: string[];
}

const CircularProgress = ({ value, suffix, label }: StatItem) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const displayValue = value > 1000 ? Math.round(value / 1000) : value;
          const step = Math.max(1, Math.floor(displayValue / 60));
          const interval = setInterval(() => {
            start += step;
            if (start >= displayValue) {
              setCurrent(displayValue);
              clearInterval(interval);
            } else {
              setCurrent(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const displayValue = value > 1000 ? Math.round(value / 1000) : value;
  const percent = (current / displayValue) * 100;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-[136px] w-[136px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-2xl font-bold text-foreground">
            {current}{value > 1000 ? "K" : ""}{suffix}
          </span>
        </div>
      </div>
      <span className="mt-[8px] font-body text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

const TrustSection = ({ items = stats, certifications = certificationLogos }: TrustSectionProps) => {
  return (
    <section className="bg-muted py-[64px]">
      <div className="container">
        <div className="text-center mb-[48px]">
          <h2 className="font-heading text-3xl font-bold text-foreground">Why Trust Us</h2>
          <p className="mt-[8px] font-body text-base text-muted-foreground max-w-xl mx-auto">
            Proven track record of excellence in medical services and patient care.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-[48px] mb-[48px]">
          {items.map((stat) => (
            <CircularProgress key={stat.label} {...stat} />
          ))}
        </div>

        {/* Scrolling Certifications */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-[32px]" style={{ width: "max-content" }}>
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={`${cert}-${i}`}
                className="flex h-[48px] items-center justify-center rounded-lg border border-border bg-card px-[24px] font-heading text-sm font-semibold text-muted-foreground whitespace-nowrap"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
