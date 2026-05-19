import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
      id="about"
      ref={sectionRef}
      className="w-full py-24 md:py-32 lg:py-40 bg-[#fcfcfc]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Image Column - 5 cols */}
          <div ref={imageRef} className="lg:col-span-5">
            <div className="relative rounded-[10px] overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="/images/gallery-facility.jpg"
                alt="F.I.B.S. Metal Recycling Facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#e5e5e5] hidden xl:block">
              <div className="text-3xl font-bold text-[#2563eb] stat-number">1950</div>
              <div className="text-sm text-[#949494]">Founded</div>
            </div>
          </div>

          {/* Content Column - 7 cols */}
          {/* Content Column - 7 cols */}
          <div ref={contentRef} className="lg:col-span-7 lg:pl-8 flex flex-col gap-8">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb]">
              About Our Company
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-[-1px] text-[#1a1a1a]">
              Serving the Middle East, Africa, Europe, and Asia with excellence since 1950
            </h2>

            <p className="text-base md:text-lg text-[#949494] leading-relaxed">
              Welcome to F.I.B.S. General Trading, one of the leading Ferrous and Non-Ferrous scrap metal exporters and processors throughout the Middle East region.
            </p>

            <p className="text-base md:text-lg text-[#949494] leading-relaxed">
              F.I.B.S. General Trading is an international trading company in the field of metal scrap with facilities spread across the Middle East and Eastern Europe, providing top-notch service to customers worldwide. Our offices and facilities are equipped with advanced machinery, experienced staff, and sophisticated management systems.
            </p>

            <h3 className="text-xl font-semibold text-[#1a1a1a]">
              We handle approximately
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#f5f5f5] rounded-xl p-6 border border-[#e5e5e5]">
                <div className="text-4xl md:text-5xl font-bold text-[#2563eb] stat-number mb-2">
                  10,000
                </div>
                <div className="text-sm text-[#949494] uppercase tracking-wide">
                  MT/Month
                </div>
                <div className="text-base font-medium text-[#1a1a1a] mt-1">
                  Non-Ferrous Metals
                </div>
              </div>

              <div className="bg-[#f5f5f5] rounded-xl p-6 border border-[#e5e5e5]">
                <div className="text-4xl md:text-5xl font-bold text-[#2563eb] stat-number mb-2">
                  60,000
                </div>
                <div className="text-sm text-[#949494] uppercase tracking-wide">
                  MT/Month
                </div>
                <div className="text-base font-medium text-[#1a1a1a] mt-1">
                  Ferrous Metals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}