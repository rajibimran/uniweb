import { Wrench } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import { equipmentList, type EquipmentItem } from "@/data/mockData";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1600&h=900&fit=crop", alt: "Advanced laboratory equipment" },
  { src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&h=900&fit=crop", alt: "Medical diagnostic devices" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=900&fit=crop", alt: "Digital imaging equipment" },
];

interface EquipmentPageProps {
  equipment?: EquipmentItem[];
}

const EquipmentPage = ({ equipment = equipmentList }: EquipmentPageProps) => {
  const majorEquipment = equipment.filter((e) => e.origin && e.status);
  const allEquipment = equipment;

  return (
    <Layout>
      <PageHeroSlider
        images={heroImages}
        title="Medical Equipment"
        subtitle="State-of-the-art medical equipment ensuring precision, speed, and reliability in diagnostics."
      />

      {/* Key Equipment Cards */}
      <section className="py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Key Diagnostic Equipment</h2>
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {majorEquipment.map((eq) => (
              <div key={eq.slNo} className="rounded-lg border border-border bg-card overflow-hidden">
                <img
                  src={
                    eq.slNo === "01" ? "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop"
                    : eq.slNo === "02" ? "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=250&fit=crop"
                    : eq.slNo === "03" ? "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&h=250&fit=crop"
                    : "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop"
                  }
                  alt={eq.name.split(",")[0]}
                  className="w-full h-[160px] object-cover"
                  loading="lazy"
                />
                <div className="p-[24px]">
                  <h3 className="font-heading text-base font-semibold text-foreground">{eq.name.split(",")[0]}</h3>
                  <p className="mt-[4px] font-body text-xs text-muted-foreground">{eq.model}</p>
                  <div className="mt-[16px] flex items-center justify-between">
                    {eq.origin && (
                      <span className="font-body text-xs text-muted-foreground">Origin: {eq.origin}</span>
                    )}
                    {eq.status && (
                      <span className="rounded bg-accent/10 px-[8px] py-[2px] font-heading text-xs font-semibold text-accent">
                        {eq.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Equipment Table */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Complete Equipment List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse bg-card rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground w-[60px]">Sl.</th>
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Equipment Name</th>
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Model</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground w-[80px]">Qty</th>
                </tr>
              </thead>
              <tbody>
                {allEquipment.map((eq, i) => (
                  <tr key={eq.slNo} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                    <td className="p-[16px] font-body text-sm text-muted-foreground">{eq.slNo}</td>
                    <td className="p-[16px] font-body text-sm text-foreground">{eq.name}</td>
                    <td className="p-[16px] font-body text-sm text-muted-foreground">{eq.model}</td>
                    <td className="p-[16px] text-center font-body text-sm text-foreground">{eq.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-[24px] text-center">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">Precision</h3>
              <p className="font-body text-sm text-muted-foreground">
                Automated systems minimize human error in chemical and biological analysis.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-[24px] text-center">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">Speed</h3>
              <p className="font-body text-sm text-muted-foreground">
                High-throughput analyzers allow us to process thousands of samples daily.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-[24px] text-center">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">Reliability</h3>
              <p className="font-body text-sm text-muted-foreground">
                Daily QC/Calibration and regular maintenance for consistency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EquipmentPage;
