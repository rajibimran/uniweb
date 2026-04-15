import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import { api, IS_STRAPI_CONFIGURED, type PageHero } from "@/lib/api";

const defaultContactHero: PageHero = {
  page: "contact",
  title: "Contact Us",
  subtitle: "We're here to help. Reach out for appointments, inquiries, or assistance.",
  slides: [
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop", alt: "Medical center reception" },
    { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop", alt: "Healthcare professionals" },
    { src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&h=900&fit=crop", alt: "Patient support" },
  ],
};

const Contact = () => {
  const { pathname } = useLocation();
  const { layoutReady, siteConfig } = useStrapiLayout();
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultContactHero);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [serviceOptions, setServiceOptions] = useState<{ id: string; label: string }[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [h, services] = await Promise.all([api.hero.getByPage("contact", defaultContactHero), api.services.getAll()]);
      if (!cancelled) {
        setHero(h);
        setServiceOptions(
          services
            .map((s) => ({ id: s.href.replace("/services/", ""), label: s.title }))
            .filter((s) => s.id && s.label)
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const strapiBlocking = IS_STRAPI_CONFIGURED && (!layoutReady || !hero);
  if (strapiBlocking) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle="Contact Us — Unicare Medical, Dhaka"
          fallbackDescription={hero?.subtitle ?? defaultContactHero.subtitle}
          pathForCanonical={pathname}
        />
        <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading contact page" />
        <PageBreadcrumb items={[{ label: "Contact Us" }]} />
        <div className="container py-[48px]">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2">
            <div className="h-96 animate-pulse rounded-lg bg-muted" />
            <div className="h-96 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </Layout>
    );
  }

  const telHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : "";
  const contactRows = [
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: telHref },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: "Address", value: siteConfig.address },
    { icon: Clock, label: "Hours", value: siteConfig.workingHours },
  ];

  return (
    <Layout>
      <SeoHelmet
        layers={[hero!.seo]}
        fallbackTitle="Contact Us — Unicare Medical, Dhaka"
        fallbackDescription={hero!.subtitle}
        pathForCanonical={pathname}
      />
      <PageHeroSlider images={hero!.slides} title={hero!.title} subtitle={hero!.subtitle}>
        <div className="mt-[24px] flex flex-col items-center gap-[12px] sm:flex-row sm:justify-center">
          <Link to="/book">
            <Button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
              Book Appointment
            </Button>
          </Link>
        </div>
      </PageHeroSlider>

      <PageBreadcrumb items={[{ label: "Contact Us" }]} />

      <section className="py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2">
            <div className="space-y-[24px]">
              <div className="space-y-[20px] rounded-lg border border-border bg-card p-[24px]">
                <h2 className="font-heading text-xl font-bold text-foreground">Contact Information</h2>
                {contactRows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-[12px]">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="font-body text-sm text-muted-foreground hover:text-primary">
                          {value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-muted-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
                {siteConfig.googleMapsEmbed ? (
                  <iframe
                    src={siteConfig.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic location"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                    Map unavailable
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-[32px]">
              {submitted ? (
                <div className="flex h-full items-center justify-center text-center">
                  <div>
                    <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-accent/10">
                      <Send className="h-[28px] w-[28px] text-accent" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">Message Sent!</h3>
                    <p className="mt-[8px] font-body text-sm text-muted-foreground">Our team will respond within 24 hours.</p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setService("");
                        setMessage("");
                      }}
                      className="mt-[24px] h-[44px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-[16px]">
                  <h2 className="font-heading text-xl font-bold text-foreground">Send Us a Message</h2>
                  <div>
                    <Label htmlFor="c-name" className="mb-[4px] block font-heading text-sm font-semibold text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="c-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="h-[44px] font-body text-sm"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                    <div>
                      <Label htmlFor="c-email" className="mb-[4px] block font-heading text-sm font-semibold text-foreground">
                        Email *
                      </Label>
                      <Input
                        id="c-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="h-[44px] font-body text-sm"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="c-phone" className="mb-[4px] block font-heading text-sm font-semibold text-foreground">
                        Phone
                      </Label>
                      <Input
                        id="c-phone"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder="01XX-XXX-XXXX"
                        className="h-[44px] font-body text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="c-service" className="mb-[4px] block font-heading text-sm font-semibold text-foreground">
                      Service Interest
                    </Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="h-[44px] font-body text-sm">
                        <SelectValue placeholder="Select a service (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((opt) => (
                          <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                        ))}
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="c-message" className="mb-[4px] block font-heading text-sm font-semibold text-foreground">
                      Message *
                    </Label>
                    <Textarea
                      id="c-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      className="min-h-[140px] font-body text-sm"
                      maxLength={1000}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[48px] w-full rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-[8px] h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
