import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface GCCCountry {
  name: string;
  flag: string;
}

const countries: GCCCountry[] = [
  { name: "Bahrain", flag: "https://flagcdn.com/w160/bh.png" },
  { name: "Kuwait", flag: "https://flagcdn.com/w160/kw.png" },
  { name: "Oman", flag: "https://flagcdn.com/w160/om.png" },
  { name: "UAE", flag: "https://flagcdn.com/w160/ae.png" },
  { name: "Saudi Arabia", flag: "https://flagcdn.com/w160/sa.png" },
  { name: "Qatar", flag: "https://flagcdn.com/w160/qa.png" },
  { name: "Yemen", flag: "https://flagcdn.com/w160/ye.png" },
];

const GCCCountriesSection = () => {
  return (
    <section className="py-[48px]">
      <div className="container">
        <div className="text-center mb-[32px]">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            GAMCA Medical Centers in Bangladesh
          </h2>
          <p className="mt-[8px] font-body text-sm text-muted-foreground">
            GCC-approved medical screening for the following countries
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[16px] sm:grid-cols-3 lg:grid-cols-4 max-w-4xl mx-auto">
          {countries.map((country) => (
            <div
              key={country.name}
              className="group flex flex-col items-center rounded-lg border border-border bg-card p-[24px] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:border-primary/30"
            >
              <div className="relative mb-[16px] flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border-[3px] border-muted bg-muted transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/20">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground text-center mb-[12px]">
                {country.name.toUpperCase()}
              </h3>
              <Link to="/book">
                <Button
                  variant="outline"
                  className="h-[36px] rounded-[4px] border-primary px-[20px] font-heading text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GCCCountriesSection;
