import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, BadgeCheck, Star, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    icon: BadgeCheck,
    title: "ISO Certified",
    description:
      "Our operations meet international ISO standards for quality management and environmental responsibility.",
  },
  {
    icon: Award,
    title: "Member of ISRI",
    description:
      "Active member of the Institute of Scrap Recycling Industries, adhering to global best practices.",
  },
  {
    icon: Star,
    title: "Golden Member of BIR",
    description:
      "Recognized as a Golden Member of the Bureau of International Recycling for excellence in trade.",
  },
  {
    icon: Trophy,
    title: "BIR Ambassador",
    description:
      "Proud BIR Ambassador for the Middle East Region, promoting sustainable recycling initiatives.",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-[#fcfcfc]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-4">
            Accreditations
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-[-1.92px] text-[#1a1a1a]">
            Certifications
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#949494] max-w-2xl mx-auto">
            Our commitment to quality and compliance is validated by leading international industry bodies.
          </p>
        </div>

        {/* Cert Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.title}
                className="cert-card cert-item bg-white rounded-xl border border-[#e5e5e5] p-8 text-center group cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#2563eb]/10 transition-colors duration-300">
                  <Icon
                    size={28}
                    className="text-[#949494] group-hover:text-[#2563eb] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#949494] leading-relaxed">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Logo Marquee */}
        <div className="mt-20 overflow-hidden">
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 px-8 shrink-0">
                {["ISO 9001:2015", "ISRI Member", "BIR Golden", "BIR Ambassador", "ISO 14001"].map(
                  (name) => (
                    <div
                      key={`${setIndex}-${name}`}
                      className="flex items-center gap-3 text-[#949494] hover:text-[#1a1a1a] transition-colors duration-300 cursor-default"
                    >
                      <BadgeCheck size={20} strokeWidth={1.5} />
                      <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                        {name}
                      </span>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
