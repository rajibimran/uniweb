import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
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
            <div className="flex items-center gap-[8px] mb-[16px]">
              <img
                src="https://unicaremedicalbd.co/assets/img/logo_unicare.png"
                alt="Unicare Medical Services Logo"
                className="h-[36px] w-auto brightness-0 invert"
              />
            </div>
            <p className="font-body text-sm leading-relaxed text-background/80 mb-[16px]">
              GCC approved medical center providing comprehensive health screening and certification services in Dhaka, Bangladesh.
            </p>
            <div className="flex flex-col gap-[8px]">
              <a href="tel:+880248316027" className="flex items-center gap-[8px] text-sm text-background/80 hover:text-background">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+88 02 48316027</span>
              </a>
              <a href="mailto:unicaremedicalbd@gmail.com" className="flex items-center gap-[8px] text-sm text-background/80 hover:text-background">
                <Mail className="h-4 w-4 shrink-0" />
                <span>unicaremedicalbd@gmail.com</span>
              </a>
              <div className="flex items-center gap-[8px] text-sm text-background/80">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>13/1, New Eskaton Road (2nd Floor), Moghbazar, Dhaka</span>
              </div>
              <div className="flex items-center gap-[8px] text-sm text-background/80">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Sat–Thu: 8AM – 8PM</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-[16px]">Quick Navigation</h3>
            <ul className="flex flex-col gap-[8px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-sm text-background/80 transition-colors hover:text-background">
                    {link.label}
                  </Link>
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
                  <Link to={link.href} className="font-body text-sm text-background/80 transition-colors hover:text-background">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Desk */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-[16px]">Help Desk</h3>
            <p className="font-body text-sm text-background/80 mb-[16px]">
              Need assistance? Our help desk is available during working hours.
            </p>
            <div className="aspect-video w-full rounded-lg bg-background/10 flex items-center justify-center text-sm text-background/50">
              <MapPin className="mr-[8px] h-5 w-5" />
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Certifications */}
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
        <div className="mt-[24px] border-t border-background/20 pt-[16px] flex flex-col sm:flex-row items-center justify-between gap-[12px]">
          <p className="font-body text-xs text-background/50">
            © {new Date().getFullYear()} Unicare Medical Services, Dhaka. All rights reserved.
          </p>
          <div className="flex items-center gap-[16px]">
            <Link to="/privacy" className="font-body text-xs text-background/50 hover:text-background">Privacy Policy</Link>
            <div className="flex items-center gap-[12px]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-background/50 hover:text-background"><Facebook className="h-4 w-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-background/50 hover:text-background"><Instagram className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/50 hover:text-background"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
