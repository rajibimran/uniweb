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
  category: string;
}

export interface ServiceDetail {
  slug: string;
  icon: string;
  title: string;
  category: string;
  heroImage: string;
  description: string;
  benefits: string[];
  pricing: { item: string; price: string; duration: string }[];
  timeline: { step: number; title: string; description: string }[];
  documents: { name: string; required: boolean }[];
  relatedSlugs: string[];
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

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  photo: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  general: boolean | string;
  cardiac: boolean | string;
  blood: boolean | string;
  radiology: boolean | string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceCategories = ["All", "Screening", "Laboratory", "Imaging", "Preventive"];

export const services: ServiceCard[] = [
  {
    icon: "Stethoscope",
    title: "General Health Checkup",
    description: "Comprehensive medical examinations for GCC country requirements with certified reporting.",
    href: "/services/general-checkup",
    category: "Screening",
  },
  {
    icon: "HeartPulse",
    title: "Cardiac Screening",
    description: "Advanced ECG and cardiac assessments by experienced cardiologists for overseas employment.",
    href: "/services/cardiac-screening",
    category: "Screening",
  },
  {
    icon: "Syringe",
    title: "Blood Tests & Lab Work",
    description: "Full blood panel testing including CBC, glucose, liver and kidney function panels.",
    href: "/services/blood-tests",
    category: "Laboratory",
  },
  {
    icon: "Microscope",
    title: "Radiology & Imaging",
    description: "Digital X-ray, ultrasound, and imaging services with quick turnaround for medical reports.",
    href: "/services/radiology",
    category: "Imaging",
  },
  {
    icon: "Eye",
    title: "Vision & Eye Testing",
    description: "Complete ophthalmic examination including visual acuity, color blindness, and eye pressure tests.",
    href: "/services/eye-testing",
    category: "Screening",
  },
  {
    icon: "Baby",
    title: "Vaccination Services",
    description: "All required vaccinations for GCC travel including meningitis, hepatitis, and typhoid.",
    href: "/services/vaccination",
    category: "Preventive",
  },
];

export const serviceDetails: Record<string, ServiceDetail> = {
  "general-checkup": {
    slug: "general-checkup",
    icon: "Stethoscope",
    title: "General Health Checkup",
    category: "Screening",
    heroImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&h=500&fit=crop",
    description: "Our General Health Checkup is a comprehensive medical examination designed to meet all GCC country requirements. This thorough assessment covers all major body systems and produces certified reports accepted by GAMCA and all GCC health ministries. Our experienced physicians ensure accurate diagnosis and timely report delivery.",
    benefits: [
      "Full physical examination by certified physicians",
      "GAMCA-approved reporting format",
      "Results available within 24–48 hours",
      "Digital report accessible online",
      "Covers all GCC country requirements (Saudi, UAE, Kuwait, Qatar, Bahrain, Oman)",
      "Includes vision, hearing, and basic cardiac assessment",
    ],
    pricing: [
      { item: "Standard GCC Medical", price: "৳3,500", duration: "2–3 hours" },
      { item: "Express GCC Medical", price: "৳5,000", duration: "1–2 hours" },
      { item: "Executive Health Package", price: "৳8,000", duration: "Half day" },
    ],
    timeline: [
      { step: 1, title: "Registration", description: "Arrive with documents and complete registration at the front desk." },
      { step: 2, title: "Sample Collection", description: "Blood and urine samples collected by certified lab technicians." },
      { step: 3, title: "Physical Examination", description: "Comprehensive examination by a licensed physician." },
      { step: 4, title: "Imaging & Tests", description: "X-ray and any additional diagnostic tests as required." },
      { step: 5, title: "Report Generation", description: "Reports compiled, reviewed, and made available for pickup or online." },
    ],
    documents: [
      { name: "Valid Passport (Original + Copy)", required: true },
      { name: "2 Passport-size Photos", required: true },
      { name: "GAMCA Slip / Token Number", required: true },
      { name: "Previous Medical Reports (if any)", required: false },
      { name: "Employment Visa Copy", required: false },
    ],
    relatedSlugs: ["cardiac-screening", "blood-tests", "eye-testing"],
  },
  "cardiac-screening": {
    slug: "cardiac-screening",
    icon: "HeartPulse",
    title: "Cardiac Screening",
    category: "Screening",
    heroImage: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=1200&h=500&fit=crop",
    description: "Our Cardiac Screening service provides advanced ECG and cardiac assessments conducted by experienced cardiologists. Essential for overseas employment medical clearance, this service ensures thorough evaluation of heart health with quick, reliable results.",
    benefits: [
      "12-lead ECG with cardiologist interpretation",
      "Blood pressure and pulse assessment",
      "Cardiac risk factor evaluation",
      "Same-day results for ECG",
      "Referral support for further evaluation if needed",
      "Accepted by all GCC health ministries",
    ],
    pricing: [
      { item: "Standard ECG", price: "৳800", duration: "30 minutes" },
      { item: "ECG + Consultation", price: "৳1,500", duration: "1 hour" },
      { item: "Comprehensive Cardiac Panel", price: "৳4,500", duration: "2 hours" },
    ],
    timeline: [
      { step: 1, title: "Check-in", description: "Register at reception with your medical file." },
      { step: 2, title: "ECG Recording", description: "12-lead ECG performed by trained technician." },
      { step: 3, title: "Cardiologist Review", description: "Results reviewed and interpreted by specialist." },
      { step: 4, title: "Report Delivery", description: "Report issued same day or next morning." },
    ],
    documents: [
      { name: "Valid Passport or National ID", required: true },
      { name: "Referral Letter (if applicable)", required: false },
      { name: "Previous Cardiac Reports", required: false },
    ],
    relatedSlugs: ["general-checkup", "blood-tests", "radiology"],
  },
  "blood-tests": {
    slug: "blood-tests",
    icon: "Syringe",
    title: "Blood Tests & Lab Work",
    category: "Laboratory",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=500&fit=crop",
    description: "Our state-of-the-art laboratory offers a full range of blood panel testing including CBC, glucose, liver and kidney function panels. All tests are processed with modern automated analyzers ensuring accuracy and fast turnaround times.",
    benefits: [
      "Automated analyzers for high accuracy",
      "Complete blood count (CBC) and differential",
      "Liver function tests (LFT) and kidney function tests (KFT)",
      "Blood glucose and HbA1c testing",
      "Hepatitis B & C, HIV screening",
      "Results within 4–24 hours",
    ],
    pricing: [
      { item: "Basic Blood Panel (CBC + Blood Group)", price: "৳600", duration: "4 hours" },
      { item: "Comprehensive Panel", price: "৳2,000", duration: "24 hours" },
      { item: "Full GCC Screening Panel", price: "৳3,000", duration: "24 hours" },
    ],
    timeline: [
      { step: 1, title: "Fasting Check", description: "Confirm 8-12 hour fasting for accurate results." },
      { step: 2, title: "Sample Collection", description: "Blood drawn by certified phlebotomist." },
      { step: 3, title: "Lab Processing", description: "Samples analyzed using automated equipment." },
      { step: 4, title: "Result Delivery", description: "Digital report sent via SMS/email or collected in person." },
    ],
    documents: [
      { name: "Valid ID (Passport or NID)", required: true },
      { name: "Doctor's Prescription (if applicable)", required: false },
      { name: "Previous Lab Reports", required: false },
    ],
    relatedSlugs: ["general-checkup", "cardiac-screening", "vaccination"],
  },
  "radiology": {
    slug: "radiology",
    icon: "Microscope",
    title: "Radiology & Imaging",
    category: "Imaging",
    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&h=500&fit=crop",
    description: "Our Radiology department features digital X-ray and ultrasound imaging services. Staffed by experienced radiologists and technicians, we provide quick turnaround times for medical reports required for GCC employment and health certification.",
    benefits: [
      "Digital X-ray with minimal radiation exposure",
      "Ultrasound imaging for abdominal assessment",
      "Reports reviewed by certified radiologists",
      "Same-day report delivery for X-rays",
      "DICOM-compliant digital storage",
      "Clean, modern imaging facilities",
    ],
    pricing: [
      { item: "Chest X-ray (PA View)", price: "৳500", duration: "30 minutes" },
      { item: "Abdominal Ultrasound", price: "৳1,200", duration: "1 hour" },
      { item: "Full Imaging Package", price: "৳3,000", duration: "2 hours" },
    ],
    timeline: [
      { step: 1, title: "Registration", description: "Check in with your referral or medical file." },
      { step: 2, title: "Preparation", description: "Change into gown if required, remove metal objects." },
      { step: 3, title: "Imaging", description: "X-ray or ultrasound performed by certified technician." },
      { step: 4, title: "Report", description: "Radiologist reviews images and issues report." },
    ],
    documents: [
      { name: "Valid ID", required: true },
      { name: "Doctor's Referral", required: false },
      { name: "Previous Imaging Reports", required: false },
    ],
    relatedSlugs: ["general-checkup", "cardiac-screening", "blood-tests"],
  },
  "eye-testing": {
    slug: "eye-testing",
    icon: "Eye",
    title: "Vision & Eye Testing",
    category: "Screening",
    heroImage: "https://images.unsplash.com/photo-1577401239170-897c0ddf tried?w=1200&h=500&fit=crop",
    description: "Complete ophthalmic examination covering visual acuity, color blindness, and intraocular pressure testing. Our eye testing service meets all GCC requirements for overseas employment medical clearance.",
    benefits: [
      "Visual acuity testing (distance and near)",
      "Color blindness assessment (Ishihara test)",
      "Intraocular pressure measurement",
      "Basic slit-lamp examination",
      "Certified results for GCC medical reports",
      "Prescription recommendation if needed",
    ],
    pricing: [
      { item: "Basic Vision Test", price: "৳400", duration: "20 minutes" },
      { item: "Comprehensive Eye Exam", price: "৳1,000", duration: "45 minutes" },
      { item: "Eye Exam + Prescription", price: "৳1,500", duration: "1 hour" },
    ],
    timeline: [
      { step: 1, title: "Registration", description: "Check in at the ophthalmology counter." },
      { step: 2, title: "Preliminary Tests", description: "Auto-refraction and visual acuity measured." },
      { step: 3, title: "Detailed Examination", description: "Color vision, pressure, and slit-lamp exam." },
      { step: 4, title: "Report", description: "Results documented in your medical file." },
    ],
    documents: [
      { name: "Valid ID", required: true },
      { name: "Current Eyeglasses (if worn)", required: false },
    ],
    relatedSlugs: ["general-checkup", "cardiac-screening", "vaccination"],
  },
  "vaccination": {
    slug: "vaccination",
    icon: "Baby",
    title: "Vaccination Services",
    category: "Preventive",
    heroImage: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=1200&h=500&fit=crop",
    description: "We provide all required vaccinations for GCC travel and overseas employment including meningitis, hepatitis A & B, typhoid, and seasonal influenza. All vaccines are WHO-approved and administered by trained nursing staff.",
    benefits: [
      "WHO-approved vaccines only",
      "Meningococcal (ACWY) vaccination",
      "Hepatitis A & B immunization",
      "Typhoid vaccination",
      "Yellow fever (with international certificate)",
      "Digital vaccination record maintained",
    ],
    pricing: [
      { item: "Meningitis Vaccine", price: "৳1,500", duration: "15 minutes" },
      { item: "Hepatitis B (3-dose series)", price: "৳3,000", duration: "6 months" },
      { item: "Complete Travel Vaccine Package", price: "৳5,500", duration: "1 visit" },
    ],
    timeline: [
      { step: 1, title: "Consultation", description: "Nurse reviews travel requirements and medical history." },
      { step: 2, title: "Vaccination", description: "Vaccine administered by trained nursing staff." },
      { step: 3, title: "Observation", description: "15-minute post-vaccine observation period." },
      { step: 4, title: "Documentation", description: "Vaccination card and digital record issued." },
    ],
    documents: [
      { name: "Valid Passport", required: true },
      { name: "Previous Vaccination Records", required: false },
      { name: "Travel Itinerary", required: false },
    ],
    relatedSlugs: ["general-checkup", "blood-tests", "eye-testing"],
  },
};

export const comparisonData: ComparisonRow[] = [
  { feature: "Physical Examination", general: true, cardiac: false, blood: false, radiology: false },
  { feature: "ECG / Cardiac Test", general: "Basic", cardiac: true, blood: false, radiology: false },
  { feature: "Blood Panel (CBC)", general: true, cardiac: false, blood: true, radiology: false },
  { feature: "Liver & Kidney Function", general: true, cardiac: false, blood: true, radiology: false },
  { feature: "Chest X-Ray", general: true, cardiac: false, blood: false, radiology: true },
  { feature: "Vision Testing", general: true, cardiac: false, blood: false, radiology: false },
  { feature: "Report Turnaround", general: "24–48 hrs", cardiac: "Same day", blood: "4–24 hrs", radiology: "Same day" },
  { feature: "Starting Price", general: "৳3,500", cardiac: "৳800", blood: "৳600", radiology: "৳500" },
];

export const serviceFAQs: FAQItem[] = [
  {
    question: "What documents do I need for a GCC medical checkup?",
    answer: "You will need your valid passport (original and copy), 2 passport-size photos, and your GAMCA slip or token number. If you have previous medical reports, please bring those as well.",
  },
  {
    question: "How long does the medical examination take?",
    answer: "A standard GCC medical checkup typically takes 2–3 hours. Express services are available and can be completed in 1–2 hours for an additional fee.",
  },
  {
    question: "When will I receive my medical report?",
    answer: "Standard reports are available within 24–48 hours. Express reports can be ready the same day. You can check your report status online through our website.",
  },
  {
    question: "Do I need to fast before the medical checkup?",
    answer: "Yes, we recommend 8–12 hours of fasting before your appointment for accurate blood test results. You may drink water during the fasting period.",
  },
  {
    question: "Is your center approved by GAMCA?",
    answer: "Yes, Unicare Medical is fully approved by GAMCA (GCC Approved Medical Centers Association) and all GCC health ministries including Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.",
  },
  {
    question: "Can I book an appointment online?",
    answer: "Yes, you can book an appointment through our website or by calling our reception. Walk-in patients are also welcome, though appointments are recommended to minimize wait times.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Anwar Hossain",
    role: "Chief Medical Officer",
    credentials: "MBBS, FCPS (Medicine), 20+ years experience",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Sultana Begum",
    role: "Senior Radiologist",
    credentials: "MBBS, DMRD, 15+ years experience",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Kamal Uddin",
    role: "Cardiologist",
    credentials: "MBBS, MD (Cardiology), 12+ years experience",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Nasreen Akter",
    role: "Ophthalmologist",
    credentials: "MBBS, DO, 10+ years experience",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Rafiqul Islam",
    role: "Pathologist",
    credentials: "MBBS, M.Phil (Pathology), 14+ years experience",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Nurse Ayesha Siddiqua",
    role: "Head Nurse",
    credentials: "BSN, 8+ years clinical experience",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face",
  },
];

export const facilityImages: { src: string; alt: string }[] = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop", alt: "Modern reception area" },
  { src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&h=600&fit=crop", alt: "Laboratory equipment" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop", alt: "Radiology department" },
  { src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=600&fit=crop", alt: "Clean examination room" },
  { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop", alt: "Medical consultation room" },
  { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop", alt: "Patient waiting area" },
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
