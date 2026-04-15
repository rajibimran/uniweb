import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import GCCCountriesSection from "@/components/home/GCCCountriesSection";
import TrustSection from "@/components/home/TrustSection";
import CountryGuidelinesSection from "@/components/home/CountryGuidelinesSection";
import QuickContactSection from "@/components/home/QuickContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <GCCCountriesSection />
      <TrustSection />
      <CountryGuidelinesSection />
      <QuickContactSection />
    </Layout>
  );
};

export default Index;
