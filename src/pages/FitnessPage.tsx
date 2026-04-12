import { useEffect } from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { fitnessCriteria, type FitnessCriteria } from "@/data/mockData";

const categoryIcons: Record<string, React.ElementType> = {
  "Infectious Diseases — Must Be Negative / Non-Reactive": ShieldAlert,
  "Non-Infectious Conditions — Must Be Clear": ShieldCheck,
  "Additional Requirements": AlertTriangle,
  "Physical Fitness Requirements": Dumbbell,
};

const heroImages = [
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=900&fit=crop", alt: "Fitness assessment" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "Medical screening" },
  { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Health certification" },
];

interface FitnessPageProps {
  criteria?: FitnessCriteria[];
}

const FitnessPage = ({ criteria = fitnessCriteria }: FitnessPageProps) => {
  useEffect(() => { document.title = "Fitness Criteria — Unicare Medical, Dhaka"; }, []);

  return (
    <Layout>
      <PageHeroSlider images={heroImages} title="Fitness Criteria" subtitle="Health requirements for overseas employment certification. Candidates must meet the following criteria to be certified fit.">
        <div className="mt-[24px] flex justify-center">
          <Link to="/book"><Button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">Book Appointment</Button></Link>
        </div>
      </PageHeroSlider>

      <PageBreadcrumb items={[{ label: "Fitness Criteria" }]} />

      <section className="py-[48px]">
        <div className="container max-w-4xl">
          {/* Info image */}
          <div className="mb-[32px] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=350&fit=crop"
              alt="Medical professional reviewing health criteria"
              className="w-full h-[250px] object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-[32px]">
            {criteria.map((group, i) => {
              const Icon = categoryIcons[group.category] || ShieldCheck;
              return (
                <div key={i} className="rounded-lg border border-border bg-card p-[24px]">
                  <div className="flex items-start gap-[16px] mb-[16px]">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-[24px] w-[24px] text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">{group.category}</h2>
                      <p className="mt-[4px] font-body text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-[8px] pl-[64px]">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-[8px]">
                        <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-destructive" />
                        <span className="font-body text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-[32px] rounded-lg bg-muted p-[24px] text-center">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Note:</span> These are standard GCC fitness criteria. Specific requirements may vary by destination country. Please consult our medical team for country-specific guidance.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FitnessPage;
