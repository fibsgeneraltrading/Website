import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, BarChart3, Settings, Globe, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  {
    name: "Mr. Ali Assad Shahrour",
    title: "Founder & President",
    initials: "AS",
    description: "Visionary leader with over 50 years of experience in the scrap metal industry.",
    accent: "#2563eb",
    Icon: Lightbulb,
  },
  {
  name: "Mr. Fadi Shahrour",
  title: "Vice-President",
  initials: "FA",
  description: "Experienced executive driving operational excellence and strategic growth in the scrap metal industry.",
  accent: "#2563eb",
  Icon: TrendingUp,  // 👈
},
  {
    name: "Mr. Samir Shahrour",
    title: "Managing Director",
    initials: "SS",
    description: "Oversees global operations and strategic business development initiatives.",
    accent: "#1a1a1a",
    Icon: BarChart3,
  },
  {
    name: "Mr. Ibrahim Shahrour",
    title: "Operations Director",
    initials: "IS",
    description: "Manages day-to-day processing, logistics, and facility coordination.",
    accent: "#2563eb",
    Icon: Settings,
  },
  {
    name: "Mr. Bassem Shahrour",
    title: "International Relations",
    initials: "BS",
    description: "Leads client relationships and international market expansion efforts.",
    accent: "#1a1a1a",
    Icon: Globe,
  },
];

export default function Administration() {
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
      id="administration"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-[#fcfcfc]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-4">
            Leadership
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-[-1.92px] text-[#1a1a1a]">
            Administration
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#949494] max-w-2xl mx-auto">
            Guided by decades of industry expertise and a commitment to excellence in every transaction.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {leaders.map((leader) => {
            const { Icon } = leader;
            return (
              <div
                key={leader.name}
                className="group relative bg-white rounded-2xl p-8 border border-[#ebebeb] hover:border-[#2563eb]/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
              >
                {/* Background watermark icon */}
                <div className="absolute -bottom-4 -right-4 text-[#f0f0f0] group-hover:text-[#2563eb]/8 transition-colors duration-500 pointer-events-none">
                  <Icon size={120} strokeWidth={1} />
                </div>

                {/* Top: role icon */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${leader.accent}12` }}
                >
                  <Icon size={24} style={{ color: leader.accent }} strokeWidth={1.8} />
                </div>

                {/* Animated divider */}
                <div className="w-8 h-[2px] bg-[#e5e5e5] group-hover:w-12 group-hover:bg-[#2563eb] transition-all duration-500 mb-6" />

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#2563eb]">
                    {leader.title}
                  </p>
                  <h3 className="text-lg font-bold text-[#1a1a1a] leading-snug">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-[#949494] leading-relaxed mt-2">
                    {leader.description}
                  </p>
                </div>

                {/* Bottom: monogram */}
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: leader.accent }}
                  >
                    <span className="text-xs font-bold text-white tracking-wide">
                      {leader.initials}
                    </span>
                  </div>
                  <span className="text-xs text-[#949494]">F.I.B.S. Leadership</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}