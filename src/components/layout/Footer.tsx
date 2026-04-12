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
      <div className="container px-4 py-8 sm:px-6 sm:py-[48px]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-[32px] lg:grid-cols-4">
          {/* Clinic Info */}
          <div>
            <div className="flex items-center gap-[8px] mb-4 sm:mb-[16px]">
              <img
                src="https://unicaremedicalbd.co/assets/img/logo_unicare.png"
                alt="Unicare Medical Services Logo"
                className="h-[36px] w-auto brightness-0 invert"
              />
            </div>
            <p className="font-body text-xs leading-relaxed text-background/80 mb-4 sm:text-sm sm:mb-[16px]">
              GCC approved medical center providing comprehensive health screening and certification services in Dhaka, Bangladesh.
            </p>
            <div className="flex flex-col gap-2 sm:gap-[8px]">
              <a href="tel:+880248316027" className="flex items-center gap-2 text-xs text-background/80 hover:text-background sm:text-sm sm:gap-[8px]">
                <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>+88 02 48316027</span>
              </a>
              <a href="mailto:unicaremedicalbd@gmail.com" className="flex items-center gap-2 text-xs text-background/80 hover:text-background sm:text-sm sm:gap-[8px]">
                <Mail className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>unicaremedicalbd@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-background/80 sm:text-sm sm:gap-[8px]">
                <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>13/1, New Eskaton Road (2nd Floor), Moghbazar, Dhaka</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-background/80 sm:text-sm sm:gap-[8px]">
                <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>Sat–Thu: 8AM – 8PM</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:text-lg sm:mb-[16px]">Quick Navigation</h3>
            <ul className="flex flex-col gap-2 sm:gap-[8px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-xs text-background/80 transition-colors hover:text-background sm:text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:text-lg sm:mb-[16px]">Our Services</h3>
            <ul className="flex flex-col gap-2 sm:gap-[8px]">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-xs text-background/80 transition-colors hover:text-background sm:text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Desk */}
          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:text-lg sm:mb-[16px]">Help Desk</h3>
            <p className="font-body text-xs text-background/80 mb-3 sm:text-sm sm:mb-[16px]">
              Need assistance? Our help desk is available during working hours.
            </p>
            <div className="aspect-video w-full rounded-lg bg-background/10 flex items-center justify-center text-xs text-background/50 sm:text-sm">
              <MapPin className="mr-2 h-4 w-4 sm:mr-[8px] sm:h-5 sm:w-5" />
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 border-t border-background/20 pt-4 sm:mt-[48px] sm:pt-[24px]">
          <p className="font-body text-[10px] text-background/60 text-center mb-3 sm:text-xs sm:mb-[16px]">Approved & Certified By</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-[24px]">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex h-8 items-center justify-center rounded bg-background/10 px-3 font-heading text-[10px] font-semibold text-background/70 sm:h-[40px] sm:px-[16px] sm:text-xs"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-background/20 pt-4 flex flex-col items-center gap-3 sm:mt-[24px] sm:pt-[16px] sm:flex-row sm:justify-between sm:gap-[12px]">
          <p className="font-body text-[10px] text-background/50 text-center sm:text-xs">
            © {new Date().getFullYear()} Unicare Medical Services, Dhaka. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-[16px]">
            <Link to="/privacy" className="font-body text-[10px] text-background/50 hover:text-background sm:text-xs">Privacy Policy</Link>
            <div className="flex items-center gap-3 sm:gap-[12px]">
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
