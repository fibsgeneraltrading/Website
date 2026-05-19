import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Zap, Shield, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: "Customer Focus",
    description: "Tailor-made scrap metal quality to meet exact specifications.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Rapid processing and delivery across global supply chains.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and certification for all materials traded.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "Expanding facilities and capabilities to serve more markets.",
  },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".mission-item"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="w-full py-24 md:py-32 lg:py-40 bg-[#1a1a1a] text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Main Statement */}
          <div ref={contentRef}>
            <span className="mission-item inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-6">
              Our Mission
            </span>

            <h2 className="mission-item text-3xl md:text-4xl lg:text-[56px] font-bold leading-[1.1] tracking-[-1.5px] text-white mb-8">
              Satisfying customer requirements worldwide
            </h2>

            <p className="mission-item text-base md:text-lg text-[#949494] leading-relaxed mb-10">
              Since its foundation in 1950, the company's core policy has been satisfying customer requirements by delivering tailor-made scrap metal quality combined with speed and efficiency worldwide.
            </p>

            <div className="mission-item flex items-center gap-4">
              <div className="w-16 h-[2px] bg-[#2563eb]" />
              <span className="text-sm text-[#949494]">
                Over seven decades of trusted service
              </span>
            </div>
          </div>

          {/* Right Column - Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="mission-item group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#2563eb]/30 transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center mb-4 group-hover:bg-[#2563eb]/30 transition-colors">
                    <Icon
                      size={20}
                      className="text-[#2563eb]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#949494] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
