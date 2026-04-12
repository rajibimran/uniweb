import { Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import { facilityImages } from "@/data/mockData";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop", alt: "Medical facility reception" },
  { src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1600&h=900&fit=crop", alt: "Laboratory diagnostics" },
  { src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&h=900&fit=crop", alt: "Patient examination room" },
];

interface AboutProps {
  gallery?: { src: string; alt: string }[];
}

const About = ({ gallery = facilityImages }: AboutProps) => {
  return (
    <Layout>
      <PageHeroSlider
        images={heroImages}
        title="About Us"
        subtitle="Delivering trusted, GCC-approved medical services in Dhaka."
      />

      {/* Mission */}
      <section className="py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Our Mission</h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                At Unicare Medical, our mission is to provide accurate, efficient, and compassionate medical screening services that meet international standards. We are committed to helping individuals achieve their dreams of overseas employment through reliable health certification, while maintaining the highest levels of patient care and clinical excellence.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
                alt="Medical team reviewing patient records"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Center */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop"
                alt="Advanced laboratory equipment"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Our Center</h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                Our diagnostic center is supervised by a team of highly qualified specialist doctors ensuring that every medical report is verified with professional clinical oversight. Our medical panel includes Medical Officers (Male & Female), Radiologists, and Consultant Pathologists — all dedicated to maintaining the highest standards of medical practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-[24px] text-center">
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop" alt="Precision diagnostics" className="w-full h-[160px] object-cover rounded-lg mb-[16px]" loading="lazy" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">Precision</h3>
              <p className="font-body text-sm text-muted-foreground">
                Automated systems minimize human error in chemical and biological analysis.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-[24px] text-center">
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop" alt="Fast processing" className="w-full h-[160px] object-cover rounded-lg mb-[16px]" loading="lazy" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">Speed</h3>
              <p className="font-body text-sm text-muted-foreground">
                High-throughput analyzers allow us to process thousands of samples daily.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-[24px] text-center">
              <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=250&fit=crop" alt="Reliable results" className="w-full h-[160px] object-cover rounded-lg mb-[16px]" loading="lazy" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">Reliability</h3>
              <p className="font-body text-sm text-muted-foreground">
                Daily QC/Calibration and regular maintenance for consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Facilities & Gallery</h2>
            <p className="mt-[8px] font-body text-sm text-muted-foreground">
              Our center is designed to provide a clean, organized, and patient-friendly environment.
            </p>
          </div>

          <div className="columns-1 gap-[16px] sm:columns-2 lg:columns-3">
            {gallery.map((img, i) => (
              <div key={i} className="mb-[16px] break-inside-avoid overflow-hidden rounded-lg">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Virtual Tour Placeholder */}
          <div className="mt-[32px]">
            <h3 className="font-heading text-xl font-bold text-foreground mb-[16px] text-center">Virtual Tour</h3>
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg bg-card border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-primary/10 mb-[16px]">
                  <Play className="h-[32px] w-[32px] text-primary" />
                </div>
                <p className="font-heading text-base font-semibold text-foreground">Virtual Tour Coming Soon</p>
                <p className="mt-[4px] font-body text-sm text-muted-foreground">360° video iframe placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
