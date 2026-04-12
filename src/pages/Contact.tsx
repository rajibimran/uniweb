import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop", alt: "Medical center reception" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop", alt: "Healthcare professionals" },
  { src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&h=900&fit=crop", alt: "Patient support" },
];

const Contact = () => {
  useEffect(() => { document.title = "Contact Us — Unicare Medical, Dhaka"; }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <Layout>
      <PageHeroSlider images={heroImages} title="Contact Us" subtitle="We're here to help. Reach out for appointments, inquiries, or assistance.">
        <div className="mt-[24px] flex flex-col items-center gap-[12px] sm:flex-row sm:justify-center">
          <Link to="/book">
            <Button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
              Book Appointment
            </Button>
          </Link>
        </div>
      </PageHeroSlider>

      <PageBreadcrumb items={[{ label: "Contact Us" }]} />

      <section className="py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2">
            {/* Contact Details */}
            <div className="space-y-[24px]">
              <div className="rounded-lg border border-border bg-card p-[24px] space-y-[20px]">
                <h2 className="font-heading text-xl font-bold text-foreground">Contact Information</h2>
                {[
                  { icon: Phone, label: "Phone", value: "+88 02 48316027", href: "tel:+880248316027" },
                  { icon: Mail, label: "Email", value: "unicaremedicalbd@gmail.com", href: "mailto:unicaremedicalbd@gmail.com" },
                  { icon: MapPin, label: "Address", value: "13/1, New Eskaton Road (2nd Floor), Moghbazar, Dhaka" },
                  { icon: Clock, label: "Hours", value: "Sat–Thu: 8:00 AM – 8:00 PM | Fri: Closed" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-[12px]">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="font-body text-sm text-muted-foreground hover:text-primary">{value}</a>
                      ) : (
                        <p className="font-body text-sm text-muted-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.4!3d23.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Unicare Medical location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-lg border border-border bg-card p-[32px]">
              {submitted ? (
                <div className="flex h-full items-center justify-center text-center">
                  <div>
                    <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-accent/10">
                      <Send className="h-[28px] w-[28px] text-accent" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">Message Sent!</h3>
                    <p className="mt-[8px] font-body text-sm text-muted-foreground">Our team will respond within 24 hours.</p>
                    <Button onClick={() => { setSubmitted(false); setName(""); setEmail(""); setPhone(""); setService(""); setMessage(""); }} className="mt-[24px] h-[44px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-[16px]">
                  <h2 className="font-heading text-xl font-bold text-foreground">Send Us a Message</h2>
                  <div>
                    <Label htmlFor="c-name" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Full Name *</Label>
                    <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="h-[44px] font-body text-sm" maxLength={100} required />
                  </div>
                  <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                    <div>
                      <Label htmlFor="c-email" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Email *</Label>
                      <Input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="h-[44px] font-body text-sm" maxLength={255} required />
                    </div>
                    <div>
                      <Label htmlFor="c-phone" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Phone</Label>
                      <Input id="c-phone" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="01XX-XXX-XXXX" className="h-[44px] font-body text-sm" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="c-service" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Service Interest</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="h-[44px] font-body text-sm">
                        <SelectValue placeholder="Select a service (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical-examination">Physical Examination</SelectItem>
                        <SelectItem value="digital-radiology">Digital Radiology</SelectItem>
                        <SelectItem value="laboratory-tests">Laboratory Tests</SelectItem>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="c-message" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Message *</Label>
                    <Textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className="min-h-[140px] font-body text-sm" maxLength={1000} required />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full h-[48px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                    {isSubmitting ? <><Loader2 className="mr-[8px] h-4 w-4 animate-spin" />Sending...</> : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
