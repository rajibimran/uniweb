import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const Privacy = () => {
  useEffect(() => { document.title = "Privacy Policy — Unicare Medical, Dhaka"; }, []);

  return (
    <Layout>
      <div className="bg-primary py-[48px]">
        <div className="container text-center">
          <h1 className="font-heading text-3xl font-extrabold text-primary-foreground sm:text-4xl">Privacy Policy</h1>
        </div>
      </div>
      <PageBreadcrumb items={[{ label: "Privacy Policy" }]} />
      <section className="py-[48px]">
        <div className="container max-w-3xl prose prose-sm">
          <div className="space-y-[24px] font-body text-sm text-muted-foreground leading-relaxed">
            <p>At Unicare Medical Services, we are committed to protecting the privacy and confidentiality of your personal and medical information.</p>
            <h2 className="font-heading text-lg font-bold text-foreground">Information We Collect</h2>
            <p>We collect personal information necessary for medical screening including name, contact details, passport information, and medical history as required by GCC medical examination standards.</p>
            <h2 className="font-heading text-lg font-bold text-foreground">How We Use Your Information</h2>
            <p>Your information is used exclusively for medical examination, report generation, and compliance with GAMCA and GCC health ministry requirements. We do not sell or share your data with third parties.</p>
            <h2 className="font-heading text-lg font-bold text-foreground">Data Security</h2>
            <p>We employ industry-standard security measures including encrypted data storage, secure server infrastructure, and strict access controls to protect your medical records.</p>
            <h2 className="font-heading text-lg font-bold text-foreground">Contact</h2>
            <p>For privacy-related inquiries, contact us at <a href="mailto:unicaremedicalbd@gmail.com" className="text-primary hover:underline">unicaremedicalbd@gmail.com</a>.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
