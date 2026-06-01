import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/content/RichText";
import { api, IS_STRAPI_CONFIGURED, USE_LOCAL_MOCK_HYDRATION, type CountryGuideline } from "@/lib/api";
import {
  FileText,
  AlertCircle,
  Info,
  Users,
  Lightbulb,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const LOCAL_GUIDELINES_FALLBACK: CountryGuideline[] = [
  {
    id: "ksa",
    name: "Saudi Arabia",
    flag: "https://flagcdn.com/w80/sa.png",
    details: "Results typically upload in 2 to 4 working days (WAFID / GAMCA).",
    marketingPoint1: "Medical report validity per embassy rules",
    marketingPoint2: "100% WAFID Approved",
    expertTip:
      "Book your KSA medical appointment at least 2 weeks before your intended travel date. Early morning slots (9 AM) are best to avoid long waiting times.",
    mandatoryTests:
      "Work visa requirements for Saudi Arabia are among the most stringent in the GCC. Mandatory tests include a comprehensive physical examination, blood tests for HIV, Hepatitis B & C, and Syphilis. Chest X-rays are required to screen for Tuberculosis (TB). Stool and urine analysis check for parasitic infections and kidney function. Applicants must provide proof of mandatory vaccinations as specified by the Saudi Ministry of Health.",
    rejectionCriteria:
      "Conditions that may cause immediate rejection include active Tuberculosis, positive HIV status, and chronic Hepatitis. Significant vision impairment, uncontrolled hypertension, and advanced diabetes are critical factors. Neuropsychiatric disorders or major physical disabilities hindering job performance will result in an 'Unfit' status.",
    specialRules:
      "KSA requires the medical center to be linked directly to the Enjaz system. For certain professional categories, additional tests like color blindness or psychological assessments may be requested by the employer.",
    visaCategories:
      "General Labor, Construction Workers, Drivers, Engineers, Medical Professionals, and Family Joining/Residence visas.",
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    flag: "https://flagcdn.com/w80/ae.png",
    details: "Results typically upload in 2 to 3 working days (WAFID / GAMCA).",
    marketingPoint1: "Medical report validity per embassy rules",
    marketingPoint2: "100% WAFID Approved",
    expertTip:
      "UAE has separate health authorities for each emirate — DHA for Dubai, HAAD for Abu Dhabi. Ensure your medical center is authorized for your specific emirate destination.",
    mandatoryTests:
      "UAE screening focuses heavily on communicable disease detection. Tests include HIV, Hepatitis B & C, Syphilis (VDRL), chest X-ray for TB, and complete blood count. Urine analysis for drug screening may apply for certain job categories. Physical examination includes vision, hearing, and systemic review.",
    rejectionCriteria:
      "Active TB, HIV positive, Hepatitis B/C, leprosy, and drug abuse are grounds for immediate rejection. Pregnancy in unmarried applicants, severe mental health conditions, and uncontrolled chronic diseases also lead to 'Unfit' status.",
    specialRules:
      "Free Zone and Mainland visas may have different screening requirements. Some emirates require additional tests for domestic workers. The UAE periodically updates its screening panels — always confirm current requirements before your appointment.",
    visaCategories:
      "Employment Visa, Investor Visa, Domestic Worker, Family/Residence, Free Zone Employment, and Golden Visa holders.",
  },
  {
    id: "qatar",
    name: "Qatar",
    flag: "https://flagcdn.com/w80/qa.png",
    details: "Results typically upload in 3 to 5 working days (WAFID / GAMCA).",
    marketingPoint1: "Medical report validity per embassy rules",
    marketingPoint2: "100% WAFID Approved",
    expertTip:
      "Qatar's medical requirements have become more stringent since FIFA 2022 infrastructure projects. Book early and ensure all vaccinations are up to date before your appointment.",
    mandatoryTests:
      "Qatar mandates comprehensive blood tests for HIV, Hepatitis B & C, and Syphilis. Chest X-ray for TB screening is required. Full physical examination includes cardiovascular assessment, vision testing, and musculoskeletal evaluation. Urine and stool analysis are standard for all visa categories.",
    rejectionCriteria:
      "Positive results for any infectious disease will lead to rejection. Uncontrolled diabetes, severe cardiac conditions, and active psychiatric disorders are disqualifying. Physical disabilities affecting the specific job role may also result in 'Unfit' certification.",
    specialRules:
      "Qatar requires biometric verification linked to the Qatar Visa Center system. Workers in food handling or healthcare roles must undergo additional screening for communicable diseases and may require specific vaccinations.",
    visaCategories:
      "Work Permit, Temporary Work Visa, Family Residence, Business Visa, and Domestic Worker Visa.",
  },
  {
    id: "kuwait",
    name: "Kuwait",
    flag: "https://flagcdn.com/w80/kw.png",
    details: "Results typically upload in 3 to 5 working days (WAFID / GAMCA).",
    marketingPoint1: "Medical report validity per embassy rules",
    marketingPoint2: "100% WAFID Approved",
    expertTip:
      "Kuwait has strict age-related criteria for certain job categories. Verify your eligibility before booking to avoid unnecessary costs and delays.",
    mandatoryTests:
      "Kuwait requires blood tests for HIV, Hepatitis B & C, Syphilis, and malaria. Chest X-ray for TB is mandatory. Physical examination covers blood pressure, BMI, vision, and hearing. Complete urine analysis and stool examination are required for all applicants.",
    rejectionCriteria:
      "Positive infectious disease results, drug traces in urine, active TB, and chronic Hepatitis are immediate disqualifiers. Severe obesity (BMI > 35), uncontrolled hypertension, and significant physical limitations are also cause for rejection.",
    specialRules:
      "Kuwait enforces an age cap for certain blue-collar visa categories. The medical report must be stamped and verified by the Kuwait Embassy. Repeat applicants after an 'Unfit' result must wait a minimum of 3 months before re-examination.",
    visaCategories:
      "Work Visa (Article 18), Domestic Worker (Article 20), Dependent Visa, Government Project Worker, and Private Sector Employment.",
  },
  {
    id: "bahrain",
    name: "Bahrain",
    flag: "https://flagcdn.com/w80/bh.png",
    details: "Results typically upload in 2 to 3 working days (WAFID / GAMCA).",
    marketingPoint1: "Medical report validity per embassy rules",
    marketingPoint2: "100% WAFID Approved",
    expertTip:
      "Bahrain's process is one of the most streamlined in the GCC. Results are typically available faster than other countries. Morning appointments generally have shorter wait times.",
    mandatoryTests:
      "Standard blood screening for HIV, Hepatitis B & C, and Syphilis. Chest X-ray for TB detection. Physical examination includes cardiovascular, respiratory, and musculoskeletal assessment. Urine analysis for kidney function and drug screening.",
    rejectionCriteria:
      "Active infectious diseases, positive HIV/Hepatitis, and active TB lead to rejection. Uncontrolled chronic conditions, severe psychiatric disorders, and physical disabilities that prevent job performance are disqualifying factors.",
    specialRules:
      "Bahrain's medical process is fully integrated with the WAFID system, allowing for quick digital verification. The Labour Market Regulatory Authority (LMRA) oversees all work permit medicals. Some employers may request additional occupational health assessments.",
    visaCategories:
      "Work Permit, Flexi Permit, Family Visit, Residence Visa, and Self-Sponsorship Visa.",
  },
  {
    id: "oman",
    name: "Oman",
    flag: "https://flagcdn.com/w80/om.png",
    details: "Results typically upload in 3 to 5 working days (WAFID / GAMCA).",
    marketingPoint1: "Medical report validity per embassy rules",
    marketingPoint2: "100% WAFID Approved",
    expertTip:
      "Oman requires all medical certificates to be attested by the Omani Embassy. Start the process early as attestation may add 2-3 extra days to your timeline.",
    mandatoryTests:
      "Comprehensive blood panel for HIV, Hepatitis B & C, Syphilis, and malaria. Chest X-ray for TB screening. Full physical examination with emphasis on occupational fitness. Stool analysis for parasitic infections and urine analysis for kidney function and drug screening.",
    rejectionCriteria:
      "Positive results for infectious diseases are automatic disqualifiers. Severe chronic illnesses, untreated mental health conditions, and significant physical disabilities are grounds for rejection. Abnormal liver or kidney function tests may require further investigation.",
    specialRules:
      "Oman requires embassy attestation of the medical report in addition to WAFID upload. The Royal Oman Police (ROP) may request additional verification for certain visa categories. Omanisation policies may affect visa issuance for specific job roles.",
    visaCategories:
      "Employment Visa, Family Joining, Investor Visa, Domestic Worker, and Temporary Work Permit.",
  },
];

const CountryGuidelinesSection = () => {
  const [guidelines, setGuidelines] = useState<CountryGuideline[] | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? LOCAL_GUIDELINES_FALLBACK : !IS_STRAPI_CONFIGURED ? [] : null
  );
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);
  const [activeCountry, setActiveCountry] = useState("ksa");

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const list = await api.countryGuidelines.getAll(LOCAL_GUIDELINES_FALLBACK);
      if (!cancelled) {
        setGuidelines(list);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!guidelines?.length) return;
    if (!guidelines.some((c) => c.id === activeCountry)) {
      setActiveCountry(guidelines[0].id);
    }
  }, [guidelines, activeCountry]);

  if (IS_STRAPI_CONFIGURED && !ready) {
    return (
      <section className="bg-muted/50 py-8 sm:py-[48px]" aria-busy="true" aria-label="Loading country guidelines">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-6 h-8 max-w-md animate-pulse rounded-md bg-muted sm:mb-[40px]" />
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-muted" />
            ))}
          </div>
          <div className="mx-auto max-w-5xl space-y-4">
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </section>
    );
  }

  if (!guidelines?.length) {
    return null;
  }

  const country = guidelines.find((c) => c.id === activeCountry) ?? guidelines[0];

  return (
    <section className="py-8 sm:py-[48px] bg-muted/50">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-[40px]">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Country-Specific{" "}
            <span className="text-accent">Medical Guidelines</span>
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground max-w-2xl mx-auto sm:text-base sm:mt-[8px]">
            Detailed health criteria, processing times, and visa requirements
            for each GCC nation.
          </p>
        </div>

        {/* Country Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-[32px] sm:gap-[8px]">
          {guidelines.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCountry(c.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-heading text-xs font-semibold transition-all duration-300 sm:px-[20px] sm:py-[10px] sm:text-sm ${
                activeCountry === c.id
                  ? "bg-accent text-accent-foreground shadow-md scale-105"
                  : "bg-card text-foreground border border-border hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <img
                src={c.flag}
                alt={`${c.name} flag`}
                className="h-4 w-6 rounded-sm object-cover sm:h-[18px] sm:w-[26px]"
              />
              {c.name}
            </button>
          ))}
        </div>

        {/* Country Content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4 sm:gap-[24px] lg:grid-cols-3">
            {/* Left: Country info card */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-[16px]">
              <div className="rounded-lg border border-border bg-card p-5 sm:p-[24px]">
                <div className="flex items-center gap-3 mb-3 sm:mb-[16px]">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="h-8 w-12 rounded object-cover sm:h-[36px] sm:w-[52px]"
                  />
                  <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                    {country.name}
                  </h3>
                </div>
                <div className="w-10 h-[3px] bg-accent rounded-full mb-3 sm:mb-[16px]" />
                {country.details ? (
                  <RichText
                    value={country.details}
                    className="font-body text-sm text-muted-foreground leading-relaxed [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed"
                  />
                ) : null}
                {country.marketingPoint1 || country.marketingPoint2 ? (
                  <div className={`space-y-2 sm:space-y-[8px] ${country.details ? "mt-4 sm:mt-[16px]" : ""}`}>
                    {country.marketingPoint1 ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                        <span className="font-body">{country.marketingPoint1}</span>
                      </div>
                    ) : null}
                    {country.marketingPoint2 ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        <span className="font-body">{country.marketingPoint2}</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <Link to="/book" className="block mt-4 sm:mt-[20px]">
                  <Button className="w-full h-[44px] rounded-[4px] bg-accent font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                    Book for {country.name}
                  </Button>
                </Link>
              </div>

              {/* Expert tip */}
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 sm:p-[20px]">
                <div className="flex items-center gap-2 mb-2 sm:mb-[8px]">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <span className="font-heading text-xs font-bold text-accent uppercase tracking-wider">
                    Expert Tip
                  </span>
                </div>
                <RichText value={country.expertTip} className="[&_p]:text-xs sm:[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed" />
              </div>
            </div>

            {/* Right: Guidelines grid */}
            <div className="lg:col-span-2 grid gap-4 sm:gap-[16px] sm:grid-cols-2">
              {/* Mandatory Tests */}
              <div className="rounded-lg border border-border bg-card p-4 sm:p-[20px]">
                <div className="flex items-center gap-2 mb-3 sm:mb-[12px]">
                  <FileText className="h-5 w-5 text-primary" />
                  <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider sm:text-[13px]">
                    Mandatory Tests
                  </h4>
                </div>
                <RichText value={country.mandatoryTests} className="[&_p]:text-xs sm:[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed" />
              </div>

              {/* Rejection Criteria */}
              <div className="rounded-lg border border-border bg-card p-4 sm:p-[20px]">
                <div className="flex items-center gap-2 mb-3 sm:mb-[12px]">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider sm:text-[13px]">
                    Rejection Criteria
                  </h4>
                </div>
                <RichText value={country.rejectionCriteria} className="[&_p]:text-xs sm:[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed" />
              </div>

              {/* Special Rules */}
              <div className="rounded-lg border border-border bg-card p-4 sm:p-[20px]">
                <div className="flex items-center gap-2 mb-3 sm:mb-[12px]">
                  <Info className="h-5 w-5 text-secondary" />
                  <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider sm:text-[13px]">
                    Special Rules
                  </h4>
                </div>
                <RichText value={country.specialRules} className="[&_p]:text-xs sm:[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed" />
              </div>

              {/* Visa Categories */}
              <div className="rounded-lg border border-border bg-card p-4 sm:p-[20px]">
                <div className="flex items-center gap-2 mb-3 sm:mb-[12px]">
                  <Users className="h-5 w-5 text-accent" />
                  <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider sm:text-[13px]">
                    Visa Categories
                  </h4>
                </div>
                <RichText value={country.visaCategories} className="[&_p]:text-xs sm:[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryGuidelinesSection;
