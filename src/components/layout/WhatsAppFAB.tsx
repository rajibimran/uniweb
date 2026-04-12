import { MessageCircle } from "lucide-react";

const WhatsAppFAB = () => {
  return (
    <a
      href="https://wa.me/880XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[24px] right-[24px] z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 hover:bg-accent/90"
    >
      <MessageCircle className="h-[28px] w-[28px]" />
    </a>
  );
};

export default WhatsAppFAB;
