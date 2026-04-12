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

const TrustSection = ({
  items = stats,
  certifications = certificationLogos,
  packages = servicePackages,
}: TrustSectionProps) => {
  return (
    <>
      {/* Stats */}
      <section className="bg-foreground py-8 sm:py-[48px]">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-[64px]">
            {items.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="relative h-[100px] w-[100px] sm:h-[136px] sm:w-[136px]">
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
                    <span className="font-heading text-xl font-bold text-background sm:text-2xl">
                      {stat.value}{stat.suffix}
                    </span>
                  </div>
                </div>
                <span className="mt-1 font-body text-xs font-medium text-background/80 sm:mt-[8px] sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-8 sm:py-[48px]">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-[32px]">
            <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Service Packages</h2>
            <p className="mt-1 font-body text-xs text-muted-foreground sm:mt-[8px] sm:text-sm">
              Choose the package that best suits your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[24px] lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="rounded-lg border border-border bg-card p-4 flex flex-col sm:p-[24px]">
                <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">{pkg.title}</h3>
                <p className="mt-1 font-body text-xs text-muted-foreground flex-1 sm:mt-[8px] sm:text-sm">{pkg.description}</p>
                <ul className="mt-3 space-y-2 sm:mt-[16px] sm:space-y-[8px]">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 sm:gap-[8px]">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                      <span className="font-body text-xs text-foreground sm:text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between sm:mt-[16px] sm:pt-[16px]">
                  <span className="font-heading text-xs font-semibold text-primary sm:text-sm">{pkg.pricing}</span>
                  <a href="tel:+880248316027">
                    <Button variant="outline" className="h-9 rounded-[4px] px-3 font-heading text-xs font-semibold sm:h-[44px] sm:px-[16px]">
                      <Phone className="mr-1 h-3.5 w-3.5 sm:mr-[4px] sm:h-4 sm:w-4" />
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
      <section className="bg-muted py-6 sm:py-[32px]">
        <div className="container px-4 sm:px-6">
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-4 sm:gap-[32px]" style={{ width: "max-content" }}>
              {[...certifications, ...certifications].map((cert, i) => (
                <div
                  key={`${cert}-${i}`}
                  className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-4 font-heading text-xs font-semibold text-muted-foreground whitespace-nowrap sm:h-[48px] sm:px-[24px] sm:text-sm"
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
