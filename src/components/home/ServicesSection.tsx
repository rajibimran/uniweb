import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RichText } from "@/components/content/RichText";
import { ServiceMark } from "@/components/service/ServiceMark";
import { api, IS_STRAPI_CONFIGURED, USE_LOCAL_MOCK_HYDRATION } from "@/lib/api";
import { services as defaultServices, type ServiceCard } from "@/data/mockData";

const ServicesSection = () => {
  const [items, setItems] = useState<ServiceCard[] | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultServices : IS_STRAPI_CONFIGURED ? null : []
  );
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const list = await api.services.getAll();
      if (!cancelled) {
        setItems(list);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !items) {
    return (
      <section className="py-10 sm:py-[64px]" aria-busy="true" aria-label="Loading services">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-8 h-8 max-w-xs animate-pulse rounded-md bg-muted sm:mb-[48px]" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[32px] lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="h-[160px] animate-pulse bg-muted sm:h-[180px]" />
                <div className="space-y-2 p-4 sm:p-[24px]">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            return (
              <Link
                key={service.title}
                to={service.href}
                className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
              >
                {service.cardImage ? (
                  <img
                    src={service.cardImage}
                    alt={service.title}
                    className="w-full h-[160px] object-cover sm:h-[180px]"
                    loading="lazy"
                    width={500}
                    height={300}
                  />
                ) : (
                  <div
                    className="flex h-[160px] w-full items-center justify-center bg-muted text-muted-foreground sm:h-[180px]"
                    aria-hidden
                  >
                    <ServiceMark icon={service.icon} iconImage={service.iconImage} className="h-10 w-10 opacity-40" />
                  </div>
                )}
                <div className="p-4 sm:p-[24px]">
                  <div className="mb-2 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-primary/10 sm:mb-[12px] sm:h-[40px] sm:w-[40px]">
                    <ServiceMark
                      icon={service.icon}
                      iconImage={service.iconImage}
                      className="h-[18px] w-[18px] text-primary sm:h-[20px] sm:w-[20px]"
                    />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">{service.title}</h3>
                  <RichText
                    value={service.description}
                    className="mt-1 sm:mt-[8px] [&_p]:text-xs sm:[&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground"
                  />
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
