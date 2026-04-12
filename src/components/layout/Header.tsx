import { useState } from "react";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navItems, type NavItem } from "@/data/mockData";

interface HeaderProps {
  items?: NavItem[];
}

const Header = ({ items = navItems }: HeaderProps) => {
  const [open, setOpen] = useState(false);

  // Flatten items for mobile nav
  const flatItems = items.flatMap((item) =>
    item.children ? item.children : [item]
  );

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
            src="https://unicaremedicalbd.co/assets/img/logo_unicare.png"
            alt="Unicare Medical Services Logo"
            className="h-[44px] w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-[8px] lg:flex">
          <nav className="flex items-center gap-0">
              {items.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <button className="font-body text-[13px] font-medium text-foreground hover:text-primary px-3 py-2 inline-flex items-center whitespace-nowrap gap-1">
                      {item.label}
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-1 z-50">
                      <ul className="bg-card border border-border rounded-[4px] shadow-lg w-[180px] py-[6px]">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.href}
                              className="block px-[12px] py-[6px] font-body text-[13px] font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="font-body text-[13px] font-medium text-foreground transition-colors hover:text-primary px-3 py-2 inline-flex items-center whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              )}
          </nav>

          <Link
            to="/reports"
            className="font-body text-[13px] font-medium text-primary transition-colors hover:text-primary/80 whitespace-nowrap"
          >
            Reports
          </Link>
          <Link to="/book">
            <Button className="h-[44px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90">
              Book Appointment
            </Button>
          </Link>
        </div>

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
              {flatItems.map((item) => (
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
