import { Stethoscope, HeartPulse, Syringe, Microscope, Eye, Baby } from "lucide-react";
import { services, type ServiceCard } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  HeartPulse,
  Syringe,
  Microscope,
  Eye,
  Baby,
};

interface ServicesSectionProps {
  items?: ServiceCard[];
}

const ServicesSection = ({ items = services }: ServicesSectionProps) => {
  return (
    <section className="py-[64px]">
      <div className="container">
        <div className="text-center mb-[48px]">
          <h2 className="font-heading text-3xl font-bold text-foreground">Our Services</h2>
          <p className="mt-[8px] font-body text-base text-muted-foreground max-w-xl mx-auto">
            Comprehensive medical services approved by GCC health ministries for overseas employment and travel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <div
                key={service.title}
                className="group rounded-lg border border-border bg-card p-[24px] transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
              >
                <div className="mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-[24px] w-[24px] text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="mt-[8px] font-body text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <a
                  href={service.href}
                  className="mt-[16px] inline-block font-heading text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Learn More →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
