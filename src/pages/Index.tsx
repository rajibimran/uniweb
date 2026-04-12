import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import GCCCountriesSection from "@/components/home/GCCCountriesSection";
import TrustSection from "@/components/home/TrustSection";
import CountryGuidelinesSection from "@/components/home/CountryGuidelinesSection";
import QuickContactSection from "@/components/home/QuickContactSection";

const Index = () => {
  useEffect(() => { document.title = "Unicare Medical, Dhaka — GCC Approved Medical Center"; }, []);

  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <GCCCountriesSection />
      <TrustSection />
      <TestimonialSection />
      <QuickContactSection />
    </Layout>
  );
};

export default Index;
