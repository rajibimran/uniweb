import { ShieldCheck, ShieldAlert, AlertTriangle, Dumbbell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { fitnessCriteria, type FitnessCriteria } from "@/data/mockData";

const categoryIcons: Record<string, React.ElementType> = {
  "Infectious Diseases — Must Be Negative / Non-Reactive": ShieldAlert,
  "Non-Infectious Conditions — Must Be Clear": ShieldCheck,
  "Additional Requirements": AlertTriangle,
  "Physical Fitness Requirements": Dumbbell,
};

interface FitnessPageProps {
  criteria?: FitnessCriteria[];
}

const FitnessPage = ({ criteria = fitnessCriteria }: FitnessPageProps) => {
  return (
    <Layout>
      <section className="bg-primary py-[48px]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground">Fitness Criteria</h1>
          <p className="mt-[8px] font-body text-base text-primary-foreground/80 max-w-xl mx-auto">
            Health requirements for overseas employment certification. Candidates must meet the following criteria to be certified fit.
          </p>
        </div>
      </section>

      <section className="py-[48px]">
        <div className="container max-w-4xl">
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
