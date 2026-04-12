import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Stethoscope, ScanLine, TestTubes, Syringe,
  Download, FileText, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { serviceDetails, type ServiceDetail } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, ScanLine, TestTubes, Syringe,
};

interface ServicePageProps {
  service?: ServiceDetail;
}

const ServicePage = ({ service: serviceProp }: ServicePageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceProp || (slug ? serviceDetails[slug] : undefined);

  if (!service) {
    return (
      <Layout>
        <div className="container py-[64px] text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Service Not Found</h1>
          <p className="mt-[8px] font-body text-base text-muted-foreground">
            The service you're looking for doesn't exist.
          </p>
          <Link to="/services">
            <Button className="mt-[24px] h-[44px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Back to Services
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = iconMap[service.icon] || Stethoscope;
  const relatedServices = service.relatedSlugs.map((s) => serviceDetails[s]).filter(Boolean);

  useEffect(() => { document.title = `${service.title} — Unicare Medical, Dhaka`; }, [service.title]);
  const relatedServices = service.relatedSlugs
    .map((s) => serviceDetails[s])
    .filter(Boolean);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[320px] items-center overflow-hidden">
        <img src={service.heroImage} alt={service.title} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="container relative z-10 py-[48px]">
          <span className="inline-block rounded bg-primary/20 px-[12px] py-[4px] font-body text-xs font-medium text-primary-foreground mb-[8px]">
            {service.category}
          </span>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{service.title}</h1>
        </div>
      </section>

      <PageBreadcrumb items={[{ label: "Services", href: "/services" }, { label: service.title }]} />

      <div className="container py-[48px]">
        <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-[48px]">
            {/* Description */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Overview</h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground">{service.description}</p>
            </div>

            {/* Tests Included */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Tests Included</h2>
              <ul className="space-y-[12px]">
                {service.tests.map((t, i) => (
                  <li key={i} className="flex items-start gap-[12px]">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="font-body text-sm text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Benefits</h2>
              <ul className="space-y-[12px]">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-[12px]">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="font-body text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Pricing</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg border border-border overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Package</th>
                      <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Price</th>
                      <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.pricing.map((p, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="p-[16px] font-body text-sm text-foreground">{p.item}</td>
                        <td className="p-[16px] font-heading text-sm font-semibold text-primary">{p.price}</td>
                        <td className="p-[16px] font-body text-sm text-muted-foreground">{p.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Preparation Timeline</h2>
              <div className="relative pl-[32px]">
                <div className="absolute left-[11px] top-[8px] bottom-[8px] w-[2px] bg-border" />
                {service.timeline.map((step) => (
                  <div key={step.step} className="relative mb-[24px] last:mb-0">
                    <div className="absolute left-[-32px] top-[2px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-xs font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-[4px] font-body text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Required Documents</h2>
              <ul className="space-y-[12px]">
                {service.documents.map((doc, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-body text-sm text-foreground">{doc.name}</span>
                      {doc.required && (
                        <span className="rounded bg-destructive/10 px-[8px] py-[2px] font-body text-xs font-medium text-destructive">Required</span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-[44px] w-[44px]" aria-label={`Download ${doc.name}`}>
                      <Download className="h-5 w-5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="rounded-lg bg-accent/10 p-[32px] text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="mt-[8px] font-body text-sm text-muted-foreground">
                Book your {service.title.toLowerCase()} appointment today.
              </p>
              <Link to="/book">
                <Button className="mt-[24px] h-[48px] min-w-[220px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
                  Book This Service
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-[24px]">
            <div className="rounded-lg border border-border bg-card p-[24px] sticky top-[112px]">
              <h3 className="font-heading text-lg font-bold text-foreground mb-[16px]">Related Services</h3>
              <ul className="space-y-[16px]">
                {relatedServices.map((rs) => {
                  const RSIcon = iconMap[rs.icon] || Stethoscope;
                  return (
                    <li key={rs.slug}>
                      <Link to={`/services/${rs.slug}`} className="flex items-center gap-[12px] rounded-lg p-[12px] transition-colors hover:bg-muted">
                        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <RSIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-heading text-sm font-semibold text-foreground">{rs.title}</p>
                          <p className="font-body text-xs text-muted-foreground">{rs.category}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-[24px] border-t border-border pt-[24px]">
                <Link to="/services">
                  <Button variant="outline" className="w-full h-[44px] rounded-[4px] font-heading text-sm font-semibold">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
