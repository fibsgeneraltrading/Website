import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Weight, Globe, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Calendar,
    value: 70,
    suffix: "+",
    label: "Years Experience",
    description: "Since 1950",
  },
  {
    icon: Weight,
    value: 60000,
    suffix: " MT",
    label: "Monthly Capacity",
    description: "Ferrous Metals",
  },
  {
    icon: Globe,
    value: 4,
    suffix: "",
    label: "Continents Served",
    description: "Global Operations",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "International Clients",
    description: "Worldwide Partnerships",
  },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span className="stat-number">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => setInView(true),
      });

      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".stat-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-[#fcfcfc] border-y border-[#e5e5e5]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-[-1.92px] text-[#1a1a1a]">
            Our Impact
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-card text-center p-8 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5]"
              >
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#2563eb]" strokeWidth={1.5} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <div className="text-base font-medium text-[#1a1a1a] mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-[#949494]">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
