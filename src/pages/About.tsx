import { Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { teamMembers, facilityImages, type TeamMember } from "@/data/mockData";

interface AboutProps {
  team?: TeamMember[];
  gallery?: { src: string; alt: string }[];
}

const About = ({ team = teamMembers, gallery = facilityImages }: AboutProps) => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-primary py-[48px]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground">About Us</h1>
          <p className="mt-[8px] font-body text-base text-primary-foreground/80 max-w-xl mx-auto">
            Delivering trusted, GCC-approved medical services in Dhaka since 2009.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-[48px]">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">Our Mission</h2>
          <p className="font-body text-base leading-relaxed text-muted-foreground">
            At Unicare Medical, our mission is to provide accurate, efficient, and compassionate medical screening services that meet international standards. We are committed to helping individuals achieve their dreams of overseas employment through reliable health certification, while maintaining the highest levels of patient care and clinical excellence.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Meet the Team</h2>
            <p className="mt-[8px] font-body text-sm text-muted-foreground">
              Experienced professionals dedicated to your health and wellbeing.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="rounded-lg border border-border bg-card p-[24px] text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-[200px] w-[200px] rounded-full object-cover"
                  loading="lazy"
                />
                <h3 className="mt-[16px] font-heading text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="mt-[4px] font-heading text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-[8px] font-body text-xs text-muted-foreground">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Our Facility</h2>
            <p className="mt-[8px] font-body text-sm text-muted-foreground">
              State-of-the-art medical infrastructure for accurate diagnostics.
            </p>
          </div>

          {/* Masonry Grid */}
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
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
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
