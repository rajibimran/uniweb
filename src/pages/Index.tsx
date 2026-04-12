import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TrustSection from "@/components/home/TrustSection";
import TestimonialSection from "@/components/home/TestimonialSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
