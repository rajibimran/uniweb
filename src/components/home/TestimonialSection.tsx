import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials, type Testimonial } from "@/data/mockData";

interface TestimonialSectionProps {
  items?: Testimonial[];
}

const TestimonialSection = ({ items = testimonials }: TestimonialSectionProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = items[current];

  return (
    <section className="py-[64px]">
      <div className="container">
        <div className="text-center mb-[48px]">
          <h2 className="font-heading text-3xl font-bold text-foreground">Patient Testimonials</h2>
          <p className="mt-[8px] font-body text-base text-muted-foreground max-w-xl mx-auto">
            Hear from our patients about their experience at Unicare Medical.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <img
              src={t.photo}
              alt={t.name}
              className="h-[80px] w-[80px] rounded-full object-cover"
              loading="lazy"
            />
            <div className="mt-[16px] flex gap-[4px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
                />
              ))}
            </div>
            <blockquote className="mt-[16px] font-body text-base leading-relaxed text-foreground italic">
              "{t.quote}"
            </blockquote>
            <p className="mt-[8px] font-heading text-sm font-semibold text-foreground">{t.name}</p>
          </div>

          {/* Controls */}
          <div className="mt-[32px] flex items-center justify-center gap-[16px]">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="h-[44px] w-[44px] rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-[8px]">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[8px] w-[8px] rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="h-[44px] w-[44px] rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
