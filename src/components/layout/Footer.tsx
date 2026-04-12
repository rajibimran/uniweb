import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { footerQuickLinks, footerServices, certificationLogos, type FooterLink } from "@/data/mockData";

interface FooterProps {
  quickLinks?: FooterLink[];
  serviceLinks?: FooterLink[];
  certifications?: string[];
}

const Footer = ({
  quickLinks = footerQuickLinks,
  serviceLinks = footerServices,
  certifications = certificationLogos,
}: FooterProps) => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-[48px]">
        <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-[16px]">Unicare Medical</h3>
            <p className="font-body text-sm leading-relaxed text-background/80 mb-[16px]">
              GCC approved medical center providing comprehensive health screening and certification services in Dhaka, Bangladesh.
            </p>
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px] text-sm text-background/80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-[8px] text-sm text-background/80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@unicaremedical.com</span>
              </div>
              <div className="flex items-center gap-[8px] text-sm text-background/80">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-[8px] text-sm text-background/80">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Sat–Thu: 8AM – 8PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-[16px]">Quick Links</h3>
            <ul className="flex flex-col gap-[8px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-sm text-background/80 transition-colors hover:text-background">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-[16px]">Our Services</h3>
            <ul className="flex flex-col gap-[8px]">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-sm text-background/80 transition-colors hover:text-background">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Placeholder */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-[16px]">Find Us</h3>
            <div className="aspect-video w-full rounded-lg bg-background/10 flex items-center justify-center text-sm text-background/50">
              <MapPin className="mr-[8px] h-5 w-5" />
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Certification Logos */}
        <div className="mt-[48px] border-t border-background/20 pt-[24px]">
          <p className="font-body text-xs text-background/60 text-center mb-[16px]">Approved & Certified By</p>
          <div className="flex flex-wrap items-center justify-center gap-[24px]">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex h-[40px] items-center justify-center rounded bg-background/10 px-[16px] font-heading text-xs font-semibold text-background/70"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-[24px] border-t border-background/20 pt-[16px] text-center">
          <p className="font-body text-xs text-background/50">
            © {new Date().getFullYear()} Unicare Medical, Dhaka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
