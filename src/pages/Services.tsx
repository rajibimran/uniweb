import { useState } from "react";
import { Stethoscope, ScanLine, TestTubes, Syringe, Check, X as XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import {
  services, serviceCategories, comparisonData, serviceFAQs,
  type ServiceCard, type ComparisonRow, type FAQItem,
} from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, ScanLine, TestTubes, Syringe,
};

const heroImages = [
  { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop", alt: "Medical examination" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=900&fit=crop", alt: "Digital radiology" },
  { src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=900&fit=crop", alt: "Laboratory testing" },
];

// Service card images
const serviceImages: Record<string, string> = {
  "Physical Examination": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&h=300&fit=crop",
  "Digital Radiology": "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=300&fit=crop",
  "Laboratory Tests": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&h=300&fit=crop",
  "Vaccination": "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=500&h=300&fit=crop",
};

interface ServicesSectionProps {
  items?: ServiceCard[];
  categories?: string[];
  comparison?: ComparisonRow[];
  faqs?: FAQItem[];
}

const Services = ({
  items = services,
  categories = serviceCategories,
  comparison = comparisonData,
  faqs = serviceFAQs,
}: ServicesSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? items
    : items.filter((s) => s.category === activeCategory);

  return (
    <Layout>
      <PageHeroSlider
        images={heroImages}
        title="Our Services"
        subtitle="Comprehensive GCC-approved medical services for overseas employment and travel certification."
      />

      <section className="py-[48px]">
        <div className="container">
          <div className="flex flex-wrap gap-[8px] mb-[32px] justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-[44px] rounded-[4px] px-[24px] py-[12px] font-heading text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2">
            {filtered.map((service) => {
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
                    className="w-full h-[200px] object-cover"
                    loading="lazy"
                  />
                  <div className="p-[24px]">
                    <div className="mb-[12px] flex items-center gap-[12px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-[20px] w-[20px] text-primary" />
                      </div>
                      <span className="rounded bg-muted px-[8px] py-[4px] font-body text-xs text-muted-foreground">
                        {service.category}
                      </span>
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

      {/* Comparison Table */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Compare Our Services</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse bg-card rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Feature</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Physical Exam</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Radiology</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Lab Tests</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Vaccination</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                    <td className="p-[16px] font-body text-sm text-foreground">{row.feature}</td>
                    {(["physical", "radiology", "laboratory", "vaccination"] as const).map((key) => {
                      const val = row[key];
                      return (
                        <td key={key} className="p-[16px] text-center">
                          {typeof val === "boolean" ? (
                            val ? <Check className="mx-auto h-5 w-5 text-accent" /> : <XIcon className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          ) : (
                            <span className="font-body text-sm text-foreground">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[48px]">
        <div className="container max-w-3xl">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-heading text-sm font-semibold text-foreground text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
