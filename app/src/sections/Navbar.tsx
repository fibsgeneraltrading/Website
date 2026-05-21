import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Global Reach", href: "#global" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${
        scrolled
          ? "liquid-glass"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 z-10"
        >
          <span className={`text-xl md:text-2xl font-bold tracking-[-1px] transition-colors duration-300 ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}>
            F.I.B.S.
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`link-underline text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-[#1a1a1a]" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className={`hidden lg:inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            scrolled
              ? "bg-[#1a1a1a] text-white hover:bg-[#333]"
              : "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20"
          }`}
        >
          Get in Touch
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden z-10 p-2 transition-colors ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#1a1a1a] transition-all duration-500 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-medium text-white hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mt-4 px-8 py-3 rounded-full bg-[#2563eb] text-white font-medium"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
