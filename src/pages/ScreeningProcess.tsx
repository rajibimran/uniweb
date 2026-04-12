"use client";

import { useState } from "react";
import {
  ClipboardList, UserCheck, TestTubes, Stethoscope, ScanLine, FileCheck,
  Download, ChevronDown, ChevronUp, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  estimatedTime: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    icon: ClipboardList,
    title: "Registration & Document Check",
    description: "Present your documents at the reception desk for verification and registration.",
    estimatedTime: "15–20 min",
    details: [
      "Bring original passport and 2 passport-size photos",
      "Submit GAMCA slip or token number",
      "Complete patient registration form",
      "Receive your medical file and queue number",
    ],
  },
  {
    icon: TestTubes,
    title: "Sample Collection",
    description: "Blood and urine samples are collected by certified laboratory technicians.",
    estimatedTime: "10–15 min",
    details: [
      "Ensure 8–12 hours fasting for accurate blood work",
      "Blood drawn via venipuncture by trained phlebotomist",
      "Urine sample collected in sterile container",
      "Samples labeled and sent to automated analyzers",
    ],
  },
  {
    icon: Stethoscope,
    title: "Physical Examination",
    description: "A comprehensive physical exam conducted by a licensed physician.",
    estimatedTime: "20–30 min",
    details: [
      "General appearance and vital signs assessment",
      "Cardiovascular, respiratory, and abdominal examination",
      "Musculoskeletal and neurological screening",
      "Skin examination and ENT check",
    ],
  },
  {
    icon: ScanLine,
    title: "Imaging & Diagnostics",
    description: "Chest X-ray, ECG, and any required imaging performed by certified technicians.",
    estimatedTime: "15–25 min",
    details: [
      "Digital chest X-ray (PA view) with minimal radiation",
      "12-lead ECG if cardiac screening is required",
      "Vision testing including acuity and color blindness",
      "Additional imaging as prescribed by physician",
    ],
  },
  {
    icon: UserCheck,
    title: "Doctor Consultation & Review",
    description: "Senior physician reviews all results and conducts final assessment.",
    estimatedTime: "10–15 min",
    details: [
      "All test results compiled and reviewed",
      "Final medical opinion by senior consultant",
      "Any follow-up tests ordered if necessary",
      "Medical fitness determination",
    ],
  },
  {
    icon: FileCheck,
    title: "Report Generation & Collection",
    description: "Your medical report is compiled, certified, and made available for collection.",
    estimatedTime: "24–48 hours",
    details: [
      "Results compiled into standardized GCC report format",
      "Report reviewed and signed by Chief Medical Officer",
      "Digital report uploaded to online portal",
      "Physical report available at reception for pickup",
    ],
  },
];

const heroImages = [
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop", alt: "Medical screening process" },
  { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop", alt: "Patient consultation" },
  { src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=900&fit=crop", alt: "Laboratory analysis" },
];

const ScreeningProcess = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <Layout>
      <PageHeroSlider
        images={heroImages}
        title="Screening Process"
        subtitle="Your step-by-step guide to the GCC medical screening journey at Unicare Medical."
      />

      <section className="py-[48px]">
        <div className="container max-w-3xl">
          {/* Download Checklist */}
          <div className="mb-[48px] rounded-lg border border-border bg-card p-[24px] flex flex-col sm:flex-row items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=120&h=120&fit=crop"
                alt="Preparation checklist"
                className="h-[80px] w-[80px] rounded-lg object-cover hidden sm:block"
                loading="lazy"
              />
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">Preparation Checklist</h2>
                <p className="mt-[4px] font-body text-sm text-muted-foreground">
                  Download our complete preparation guide before your visit.
                </p>
              </div>
            </div>
            <Button className="h-[48px] min-w-[220px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90 shrink-0">
              <Download className="mr-[8px] h-5 w-5" />
              Download Checklist
            </Button>
          </div>

          {/* Total Time */}
          <div className="flex items-center justify-center gap-[8px] mb-[32px]">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-semibold text-foreground">
              Total Estimated Time: 2–3 hours (report in 24–48 hours)
            </span>
          </div>

          {/* Timeline */}
          <div className="relative">
            {processSteps.map((step, i) => {
              const isExpanded = expandedStep === i;
              const Icon = step.icon;
              const isLast = i === processSteps.length - 1;

              return (
                <div key={i} className="relative flex gap-[24px]">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => toggleStep(i)}
                      className={cn(
                        "relative z-10 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        isExpanded
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      )}
                      aria-label={`Step ${i + 1}: ${step.title}`}
                    >
                      <Icon className="h-[20px] w-[20px]" />
                    </button>
                    {!isLast && (
                      <div className="w-[2px] flex-1 bg-border min-h-[24px]" />
                    )}
                  </div>

                  <div className={cn("pb-[32px] flex-1", isLast && "pb-0")}>
                    <button
                      onClick={() => toggleStep(i)}
                      className="w-full text-left flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-[8px]">
                          <span className="font-heading text-xs font-semibold text-primary">Step {i + 1}</span>
                          <span className="inline-flex items-center gap-[4px] rounded bg-muted px-[8px] py-[2px] font-body text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {step.estimatedTime}
                          </span>
                        </div>
                        <h3 className="mt-[4px] font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-[4px] font-body text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="ml-[8px] mt-[4px] shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-[16px] rounded-lg border border-border bg-muted/50 p-[16px]">
                        <ul className="space-y-[8px]">
                          {step.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-[8px]">
                              <div className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-primary" />
                              <span className="font-body text-sm text-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ScreeningProcess;
