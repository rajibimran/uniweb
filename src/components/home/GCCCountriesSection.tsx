import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gccHeroBg from "@/assets/gcc-workers-hero.jpg";

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
    <section className="py-8 sm:py-[48px]">
      <div className="container px-4 sm:px-6">
        {/* Hero banner with workers + flags */}
        <div className="relative mb-6 overflow-hidden rounded-xl sm:mb-[40px]">
          <img
            src={gccHeroBg}
            alt="Bangladeshi workers successfully employed in GCC countries with country flags"
            className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[400px]"
            loading="lazy"
            width={1920}
            height={640}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-[32px]">
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl lg:text-4xl">
              GAMCA Medical Centers in Bangladesh
            </h2>
            <p className="mt-1 max-w-xl font-body text-xs text-white/90 sm:mt-[8px] sm:text-sm lg:text-base">
              GCC-approved medical screening for overseas employment — trusted by thousands of Bangladeshi workers
            </p>
            {/* Flag strip */}
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-[16px] sm:gap-[12px]">
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="group/flag flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-sm transition-all duration-300 hover:bg-white/40 hover:scale-105 sm:px-[12px] sm:py-[6px] sm:gap-[6px]"
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="h-4 w-5 rounded-sm object-cover sm:h-[20px] sm:w-[28px]"
                    loading="lazy"
                  />
                  <span className="font-heading text-[10px] font-semibold text-white sm:text-xs">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country cards grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-[16px] lg:grid-cols-4 max-w-4xl mx-auto">
          {countries.map((country) => (
            <div
              key={country.name}
              className="group flex flex-col items-center rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:border-primary/30 sm:p-[24px]"
            >
              <div className="relative mb-3 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border-[3px] border-muted bg-muted transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/20 sm:mb-[16px] sm:h-[80px] sm:w-[80px]">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-heading text-xs font-semibold text-foreground text-center mb-2 sm:text-sm sm:mb-[12px]">
                {country.name.toUpperCase()}
              </h3>
              <Link to="/book">
                <Button
                  variant="outline"
                  className="h-8 rounded-[4px] border-primary px-3 font-heading text-[10px] font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-[36px] sm:px-[20px] sm:text-xs"
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
