import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const QuickContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-muted py-[48px]">
      <div className="container">
        <div className="text-center mb-[32px]">
          <h2 className="font-heading text-2xl font-bold text-foreground">Get In Touch</h2>
          <p className="mt-[8px] font-body text-sm text-muted-foreground">
            Have questions? Reach out to us directly or send a quick message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2">
          {/* Contact Info + Map */}
          <div className="space-y-[24px]">
            <div className="rounded-lg border border-border bg-card p-[24px] space-y-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Phone</p>
                  <a href="tel:+880248316027" className="font-body text-sm text-muted-foreground hover:text-primary">+88 02 48316027</a>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Email</p>
                  <a href="mailto:unicaremedicalbd@gmail.com" className="font-body text-sm text-muted-foreground hover:text-primary">unicaremedicalbd@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Address</p>
                  <p className="font-body text-sm text-muted-foreground">13/1, New Eskaton Road (2nd Floor), Moghbazar, Dhaka</p>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Working Hours</p>
                  <p className="font-body text-sm text-muted-foreground">Sat–Thu: 8:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
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

          {/* Quick Form */}
          <div className="rounded-lg border border-border bg-card p-[24px]">
            {submitted ? (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-accent/10">
                    <Send className="h-[28px] w-[28px] text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-[8px] font-body text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-[16px]">
                <h3 className="font-heading text-lg font-bold text-foreground">Send a Message</h3>
                <div>
                  <Label htmlFor="qc-name" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Name *</Label>
                  <Input id="qc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="h-[44px] font-body text-sm" maxLength={100} required />
                </div>
                <div>
                  <Label htmlFor="qc-email" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Email *</Label>
                  <Input id="qc-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="h-[44px] font-body text-sm" maxLength={255} required />
                </div>
                <div>
                  <Label htmlFor="qc-message" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">Message *</Label>
                  <Textarea id="qc-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help you?" className="min-h-[120px] font-body text-sm" maxLength={1000} required />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-[48px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  {isSubmitting ? <><Loader2 className="mr-[8px] h-4 w-4 animate-spin" />Sending...</> : <>Send Message</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContactSection;
