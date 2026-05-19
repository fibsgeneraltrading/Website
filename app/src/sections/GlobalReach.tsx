import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlueprintGlobe from "../components/BlueprintGlobe";
import { MapPin, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const regions = [
  { name: "Middle East", x: 55, y: 45 },
  { name: "Africa", x: 48, y: 55 },
  { name: "Europe", x: 50, y: 32 },
  { name: "Asia", x: 70, y: 38 },
];

export default function GlobalReach() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="global"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#1a1a1a] overflow-hidden"
    >
      {/* 3D Globe Background */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <BlueprintGlobe />
        </Suspense>
      </div>

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/50 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-24">
        <div
          ref={overlayRef}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Liquid Glass Panel */}
          <div className="liquid-glass-dark rounded-2xl p-8 md:p-12 inline-block">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-4">
              Our Network
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-[-1.92px] text-white mb-4">
              Global Logistics, Simplified
            </h2>
            <p className="text-base md:text-lg text-[#949494] max-w-xl mx-auto mb-8">
              Real-time tracking and processing across 4 continents. Our strategically located facilities ensure efficient operations worldwide.
            </p>

            {/* Region Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <MapPin size={14} className="text-[#2563eb]" />
                  <span className="text-sm text-white/80">{region.name}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors duration-300"
            >
              Track Shipment
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
