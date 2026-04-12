import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const MobileStickyBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card/95 backdrop-blur shadow-[0_-2px_10px_rgba(0,0,0,0.1)] lg:hidden">
      <Link to="/book" className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-accent-foreground font-heading text-sm font-semibold">
        Book Appointment
      </Link>
      <a href="tel:+880248316027" className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-heading text-sm font-semibold">
        <Phone className="h-4 w-4" />
        Call Now
      </a>
    </div>
  );
};

export default MobileStickyBar;
