import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop"
        alt="Professional medical facility interior"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="container relative z-10 py-[64px] text-center">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          GCC Approved Medical Center
        </h1>
        <p className="mx-auto mt-[16px] max-w-2xl font-body text-lg leading-relaxed text-white/90">
          Trusted by thousands for comprehensive health screening, medical checkups, and overseas employment certification in Dhaka, Bangladesh.
        </p>
        <div className="mt-[32px] flex flex-col items-center justify-center gap-[16px] sm:flex-row">
          <Button
            className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90"
          >
            Book Appointment
          </Button>
          <Button
            className="h-[48px] min-w-[200px] rounded-[4px] bg-secondary px-[24px] py-[12px] font-heading text-base font-semibold text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            Check Report
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
