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
    <section className="py-10 sm:py-[64px]">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-[48px]">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Patient Testimonials</h2>
          <p className="mt-2 font-body text-sm text-muted-foreground max-w-xl mx-auto sm:text-base sm:mt-[8px]">
            Hear from our patients about their experience at Unicare Medical.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <img
              src={t.photo}
              alt={t.name}
              className="h-16 w-16 rounded-full object-cover sm:h-[80px] sm:w-[80px]"
              loading="lazy"
              width={80}
              height={80}
            />
            <div className="mt-3 flex gap-[4px] sm:mt-[16px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
                />
              ))}
            </div>
            <blockquote className="mt-3 font-body text-sm leading-relaxed text-foreground italic sm:mt-[16px] sm:text-base">
              "{t.quote}"
            </blockquote>
            <p className="mt-2 font-heading text-sm font-semibold text-foreground sm:mt-[8px]">{t.name}</p>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-[32px] sm:gap-[16px]">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="h-10 w-10 rounded-full sm:h-[44px] sm:w-[44px]"
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
              className="h-10 w-10 rounded-full sm:h-[44px] sm:w-[44px]"
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
