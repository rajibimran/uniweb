import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import { IS_STRAPI_CONFIGURED } from "@/lib/api";

const Footer = () => {
  const { layoutReady, siteConfig, footerQuickLinks, footerServiceLinks, certifications } = useStrapiLayout();

  const telHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : "tel:";
  const fb = siteConfig.socialLinks.facebook;
  const ig = siteConfig.socialLinks.instagram;
  const li = siteConfig.socialLinks.linkedin;

  if (IS_STRAPI_CONFIGURED && !layoutReady) {
    return (
      <footer className="bg-foreground text-background">
        <div className="container px-4 py-8 sm:px-6 sm:py-[48px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-8 w-32 animate-pulse rounded bg-background/10" />
                <div className="h-3 w-full animate-pulse rounded bg-background/10" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-background/10" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-background/20 pt-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 animate-pulse rounded bg-background/10" />
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container px-4 py-8 sm:px-6 sm:py-[48px]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-[32px] lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-[8px] mb-4 sm:mb-[16px]">
              <img
                src={siteConfig.logo}
                alt={`${siteConfig.siteName} Logo`}
                className="h-[36px] w-auto brightness-0 invert"
              />
            </div>
            <p className="font-body text-xs leading-relaxed text-background/80 mb-4 sm:text-sm sm:mb-[16px]">
              {siteConfig.tagline}. GCC approved medical center providing comprehensive health screening and certification
              services in Dhaka, Bangladesh.
            </p>
            <div className="flex flex-col gap-2 sm:gap-[8px]">
              <a
                href={telHref}
                className="flex items-center gap-2 text-xs text-background/80 hover:text-background sm:text-sm sm:gap-[8px]"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-xs text-background/80 hover:text-background sm:text-sm sm:gap-[8px]"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>{siteConfig.email}</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-background/80 sm:text-sm sm:gap-[8px]">
                <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-background/80 sm:text-sm sm:gap-[8px]">
                <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:text-lg sm:mb-[16px]">Quick Navigation</h3>
            <ul className="flex flex-col gap-2 sm:gap-[8px]">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-xs text-background/80 transition-colors hover:text-background sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:text-lg sm:mb-[16px]">Our Services</h3>
            <ul className="flex flex-col gap-2 sm:gap-[8px]">
              {footerServiceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-xs text-background/80 transition-colors hover:text-background sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:text-lg sm:mb-[16px]">Help Desk</h3>
            <p className="font-body text-xs text-background/80 mb-3 sm:text-sm sm:mb-[16px]">
              Need assistance? Our help desk is available during working hours.
            </p>
            {siteConfig.googleMapsEmbed ? (
              <iframe
                title="Clinic location"
                src={siteConfig.googleMapsEmbed}
                className="aspect-video w-full rounded-lg border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="aspect-video w-full rounded-lg bg-background/10 flex items-center justify-center text-xs text-background/50 sm:text-sm">
                <MapPin className="mr-2 h-4 w-4 sm:mr-[8px] sm:h-5 sm:w-5" />
                Map Placeholder
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-background/20 pt-4 sm:mt-[48px] sm:pt-[24px]">
          <p className="font-body text-[10px] text-background/60 text-center mb-3 sm:text-xs sm:mb-[16px]">Approved & Certified By</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-[24px]">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex h-8 items-center justify-center rounded bg-background/10 px-3 font-heading text-[10px] font-semibold text-background/70 sm:h-[40px] sm:px-[16px] sm:text-xs"
              >
                {cert.logoUrl ? (
                  <img src={cert.logoUrl} alt={cert.name} className="max-h-6 max-w-[100px] object-contain opacity-90 sm:max-h-8 sm:max-w-[120px]" />
                ) : (
                  cert.name
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-background/20 pt-4 flex flex-col items-center gap-3 sm:mt-[24px] sm:pt-[16px] sm:flex-row sm:justify-between sm:gap-[12px]">
          <p className="font-body text-[10px] text-background/50 text-center sm:text-xs">
            © {new Date().getFullYear()} {siteConfig.siteName}, Dhaka. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-[16px]">
            <Link
              to="/privacy"
              className="font-body text-[10px] text-background/50 hover:text-background sm:text-xs"
            >
              Privacy Policy
            </Link>
            <div className="flex items-center gap-3 sm:gap-[12px]">
              {fb ? (
                <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-background/50 hover:text-background">
                  <Facebook className="h-4 w-4" />
                </a>
              ) : null}
              {ig ? (
                <a href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-background/50 hover:text-background">
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
              {li ? (
                <a href={li} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/50 hover:text-background">
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
