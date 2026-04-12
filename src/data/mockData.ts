import { Stethoscope, HeartPulse, Syringe, Microscope, Eye, Baby } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  name: string;
  photo: string;
  rating: number;
  quote: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services: ServiceCard[] = [
  {
    icon: "Stethoscope",
    title: "General Health Checkup",
    description: "Comprehensive medical examinations for GCC country requirements with certified reporting.",
    href: "/services/general-checkup",
  },
  {
    icon: "HeartPulse",
    title: "Cardiac Screening",
    description: "Advanced ECG and cardiac assessments by experienced cardiologists for overseas employment.",
    href: "/services/cardiac-screening",
  },
  {
    icon: "Syringe",
    title: "Blood Tests & Lab Work",
    description: "Full blood panel testing including CBC, glucose, liver and kidney function panels.",
    href: "/services/blood-tests",
  },
  {
    icon: "Microscope",
    title: "Radiology & Imaging",
    description: "Digital X-ray, ultrasound, and imaging services with quick turnaround for medical reports.",
    href: "/services/radiology",
  },
  {
    icon: "Eye",
    title: "Vision & Eye Testing",
    description: "Complete ophthalmic examination including visual acuity, color blindness, and eye pressure tests.",
    href: "/services/eye-testing",
  },
  {
    icon: "Baby",
    title: "Vaccination Services",
    description: "All required vaccinations for GCC travel including meningitis, hepatitis, and typhoid.",
    href: "/services/vaccination",
  },
];

export const stats: StatItem[] = [
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Patients Served", value: 50000, suffix: "+" },
  { label: "Success Rate", value: 99, suffix: "%" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Mohammad Rahman",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    quote: "Unicare Medical made my GCC medical process incredibly smooth. The staff was professional and I received my report within 24 hours.",
  },
  {
    name: "Fatima Akter",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    quote: "Very clean facility with modern equipment. The doctors were thorough and explained everything clearly. Highly recommended.",
  },
  {
    name: "Abdul Karim",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    quote: "I've been coming here for 3 years for my annual medical. Consistent quality and friendly staff every single time.",
  },
  {
    name: "Nusrat Jahan",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    quote: "Fast service and very organized. The online report checking system is very convenient. Great experience overall.",
  },
];

export const footerQuickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Check Report", href: "/report" },
];

export const footerServices: FooterLink[] = [
  { label: "General Checkup", href: "/services/general-checkup" },
  { label: "Blood Tests", href: "/services/blood-tests" },
  { label: "Cardiac Screening", href: "/services/cardiac-screening" },
  { label: "Radiology", href: "/services/radiology" },
  { label: "Vaccination", href: "/services/vaccination" },
];

export const certificationLogos: string[] = [
  "GAMCA", "BMET", "WHO", "ISO 9001", "MOH Kuwait", "MOH Saudi",
];
