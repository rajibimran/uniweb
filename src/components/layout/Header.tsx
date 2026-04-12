import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navItems, type NavItem } from "@/data/mockData";

interface HeaderProps {
  items?: NavItem[];
}

const Header = ({ items = navItems }: HeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar with phone */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-[32px] items-center justify-between text-xs">
          <span className="font-body">Sat–Thu: 8:00 AM – 8:00 PM</span>
          <a href="tel:+880248316027" className="flex items-center gap-[4px] font-body font-medium hover:underline">
            <Phone className="h-3 w-3" />
            +88 02 48316027
          </a>
        </div>
      </div>

      <div className="container flex h-[64px] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[8px]">
          <img
            src="https://unicaremedicalbd.co/assets/img/logo.png"
            alt="Unicare Medical Services Logo"
            className="h-[44px] w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-[24px] lg:flex">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-body text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/reports"
            className="font-body text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Report Search
          </Link>
          <Link to="/book">
            <Button className="h-[44px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90">
              Book Appointment
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-[44px] w-[44px]">
              <Menu className="h-[24px] w-[24px]" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetTitle className="font-heading text-lg font-bold">Menu</SheetTitle>
            <nav className="mt-[32px] flex flex-col gap-[24px]">
              {items.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/reports"
                onClick={() => setOpen(false)}
                className="font-body text-base font-medium text-primary transition-colors hover:text-primary/80"
              >
                Report Search
              </Link>
              <Link to="/book" onClick={() => setOpen(false)}>
                <Button className="w-full h-[44px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                  Book Appointment
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
