import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { stats, certificationLogos, servicePackages, type StatItem, type ServicePackage } from "@/data/mockData";
import { Phone, CheckCircle } from "lucide-react";

interface TrustSectionProps {
  items?: StatItem[];
  certifications?: string[];
  packages?: ServicePackage[];
}

const CircularProgress = ({ value, suffix, label }: StatItem) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.max(1, Math.floor(value / 60));
          const interval = setInterval(() => {
            start += step;
            if (start >= value) {
              setCurrent(value);
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

  const percent = (current / value) * 100;
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
            {current}{suffix}
          </span>
        </div>
      </div>
      <span className="mt-[8px] font-body text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

const TrustSection = ({
  items = stats,
  certifications = certificationLogos,
  packages = servicePackages,
}: TrustSectionProps) => {
  return (
    <>
      {/* Stats */}
      <section className="bg-foreground py-[48px]">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-[64px]">
            {items.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="relative h-[136px] w-[136px]">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--background) / 0.2)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="54" fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 54}
                      strokeDashoffset={0}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-background">
                      {stat.value}{stat.suffix}
                    </span>
                  </div>
                </div>
                <span className="mt-[8px] font-body text-sm font-medium text-background/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Service Packages</h2>
            <p className="mt-[8px] font-body text-sm text-muted-foreground">
              Choose the package that best suits your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="rounded-lg border border-border bg-card p-[24px] flex flex-col">
                <h3 className="font-heading text-lg font-bold text-foreground">{pkg.title}</h3>
                <p className="mt-[8px] font-body text-sm text-muted-foreground flex-1">{pkg.description}</p>
                <ul className="mt-[16px] space-y-[8px]">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-[8px]">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                      <span className="font-body text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-[16px] pt-[16px] border-t border-border flex items-center justify-between">
                  <span className="font-heading text-sm font-semibold text-primary">{pkg.pricing}</span>
                  <a href="tel:+880248316027">
                    <Button variant="outline" className="h-[44px] rounded-[4px] px-[16px] font-heading text-xs font-semibold">
                      <Phone className="mr-[4px] h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-muted py-[32px]">
        <div className="container">
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
    </>
  );
};

export default TrustSection;
