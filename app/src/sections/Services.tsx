import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Factory,
  CircleDot,
  Globe,
  Settings,
  Recycle,
  Ship,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Factory,
    title: "Ferrous Scrap Trading",
    description:
      "Expert handling and trading of iron and steel scrap materials, sourced from premier suppliers across the globe for industrial recycling and steel production.",
  },
  {
    icon: CircleDot,
    title: "Non-Ferrous Scrap Trading",
    description:
      "Specialized in aluminum, copper, brass, and other non-ferrous metals with strict quality control and competitive pricing for global markets.",
  },
  {
    icon: Globe,
    title: "Global Export Services",
    description:
      "Seamless international trade operations with complete documentation, customs clearance, and regulatory compliance across all major markets.",
  },
  {
    icon: Settings,
    title: "Metal Processing",
    description:
      "State-of-the-art processing facilities equipped with advanced shredding, sorting, and baling machinery to prepare scrap for efficient reuse.",
  },
  {
    icon: Recycle,
    title: "Industrial Recycling",
    description:
      "Comprehensive recycling solutions that minimize environmental impact while maximizing material recovery and resource conservation.",
  },
  {
    icon: Ship,
    title: "Worldwide Logistics",
    description:
      "End-to-end logistics management from yard to port, including container loading, shipping coordination, and delivery tracking worldwide.",
  },
];

export default function Services() {
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
          stagger: 0.1,
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
      id="services"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-[#fcfcfc]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-[-1.92px] text-[#1a1a1a]">
            Our Services
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#949494] max-w-2xl mx-auto">
            Comprehensive scrap metal trading and processing solutions tailored to meet the demands of industries worldwide.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card card-glow group bg-white rounded-[5px] border border-[#e5e5e5] p-8 cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-[#f5f5f5] flex items-center justify-center mb-6 group-hover:bg-[#2563eb]/10 transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-[#949494] group-hover:text-[#2563eb] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[#949494] leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
