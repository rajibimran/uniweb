import { Stethoscope, ScanLine, TestTubes, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { services, type ServiceCard } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, ScanLine, TestTubes, Syringe,
};

const serviceImages: Record<string, string> = {
  "Physical Examination": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&h=300&fit=crop",
  "Digital Radiology": "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=300&fit=crop",
  "Laboratory Tests": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&h=300&fit=crop",
  "Vaccination": "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=500&h=300&fit=crop",
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
            Comprehensive GCC-approved medical screening services for overseas employment certification.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <Link
                key={service.title}
                to={service.href}
                className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={serviceImages[service.title] || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop"}
                  alt={service.title}
                  className="w-full h-[180px] object-cover"
                  loading="lazy"
                />
                <div className="p-[24px]">
                  <div className="mb-[12px] flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-[20px] w-[20px] text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-[8px] font-body text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-[16px] inline-block font-heading text-sm font-semibold text-primary group-hover:text-primary/80">
                    Learn More →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
