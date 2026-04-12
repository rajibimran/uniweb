import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
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
      <div className="container flex h-[72px] items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-[8px]">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-primary">
            <Plus className="h-[24px] w-[24px] text-primary-foreground" strokeWidth={3} />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Unicare Medical
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-[32px] md:flex">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Button
            className="h-[44px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Book Appointment
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-[44px] w-[44px]">
              <Menu className="h-[24px] w-[24px]" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetTitle className="font-heading text-lg font-bold">Menu</SheetTitle>
            <nav className="mt-[32px] flex flex-col gap-[24px]">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="h-[44px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90"
              >
                Book Appointment
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
