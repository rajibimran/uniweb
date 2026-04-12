import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeroSlider from "@/components/PageHeroSlider";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop", alt: "Professional medical facility interior" },
  { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&h=900&fit=crop", alt: "Modern diagnostic laboratory" },
  { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop", alt: "Medical consultation room" },
];

const HeroSection = () => {
  return (
    <PageHeroSlider
      images={heroImages}
      title="GCC Approved Medical Center"
      subtitle="Trusted for comprehensive health screening, medical checkups, and overseas employment certification in Dhaka, Bangladesh."
      height="min-h-[560px]"
    >
      <div className="mt-[32px] flex flex-col items-center justify-center gap-[16px] sm:flex-row">
        <Link to="/book">
          <Button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
            Book Appointment
          </Button>
        </Link>
        <Link to="/reports">
          <Button className="h-[48px] min-w-[200px] rounded-[4px] bg-secondary px-[24px] py-[12px] font-heading text-base font-semibold text-secondary-foreground shadow-md hover:bg-secondary/90">
            Check Report
          </Button>
        </Link>
      </div>
    </PageHeroSlider>
  );
};

export default HeroSection;
