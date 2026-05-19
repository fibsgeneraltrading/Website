import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowUp,
  Code2,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Global Reach", href: "#global" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#fcfcfc] border-t border-[#e5e5e5]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")}>
              <span className="text-3xl font-bold tracking-[-1px] text-[#1a1a1a]">
                F.I.B.S.
              </span>
            </a>
            <p className="mt-4 text-sm text-[#949494] leading-relaxed max-w-md">
              F.I.B.S. General Trading — Global Leaders in Ferrous &amp; Non-Ferrous Scrap Metal Trading. Connecting industries through reliable metal recycling since 1950.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                   <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#2563eb] hover:text-white text-[#949494] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                   <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-[#949494] hover:text-[#1a1a1a] transition-colors"
                   >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#949494]">
              <li>P.O. Box 12345</li>
              <li>Jebel Ali, Dubai, UAE</li>
              <li>+971 4 123 4567</li>
              <li>
                 <a
                  href="mailto:info@fibstrading.com"
                  className="hover:text-[#1a1a1a] transition-colors"
                 >
                  info@fibstrading.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#949494]">
            &copy; {new Date().getFullYear()} F.I.B.S. General Trading. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#949494] hover:text-[#1a1a1a] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[#949494] hover:text-[#1a1a1a] transition-colors">
              Terms of Service
            </a>

            <span className="w-px h-4 bg-[#e5e5e5]" />

             <a
              href="https://itconsultants.online"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-[#949494] hover:text-[#2563eb] transition-colors duration-300"
            >
              <Code2 size={13} className="group-hover:rotate-12 transition-transform duration-300" />
              Built by{" "}
              <span className="font-medium text-[#1a1a1a] group-hover:text-[#2563eb] transition-colors duration-300">
                IT Consultants
              </span>
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#2563eb] hover:text-white text-[#949494] transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}