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
    <section className="py-10 sm:py-[64px]">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-[48px]">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Our Services</h2>
          <p className="mt-2 font-body text-sm text-muted-foreground max-w-xl mx-auto sm:text-base sm:mt-[8px]">
            Comprehensive GCC-approved medical screening services for overseas employment certification.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[32px] lg:grid-cols-4">
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
                  className="w-full h-[160px] object-cover sm:h-[180px]"
                  loading="lazy"
                  width={500}
                  height={300}
                />
                <div className="p-4 sm:p-[24px]">
                  <div className="mb-2 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-primary/10 sm:mb-[12px] sm:h-[40px] sm:w-[40px]">
                    <Icon className="h-[18px] w-[18px] text-primary sm:h-[20px] sm:w-[20px]" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">{service.title}</h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground sm:mt-[8px] sm:text-sm">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-block font-heading text-sm font-semibold text-primary group-hover:text-primary/80 sm:mt-[16px]">
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
