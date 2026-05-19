import { useEffect, useRef } from "react";
import gsap from "gsap";
import IsometricHeroText from "../components/IsometricHeroText";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        "-=0.5"
      );
    }

    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      gsap.to(scrollIndicatorRef.current.querySelector(".bounce"), {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#1a1a1a]"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/gallery-yard.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 pt-20 flex flex-col justify-end pb-[400px]">
        <div className="mb-4">
          <IsometricHeroText text="F.I.B.S General Trading" />
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium tracking-widest uppercase">
            Global Leaders in Ferrous & Non-Ferrous Scrap Metal Trading
          </span>
        </div>
        <div className="max-w-4xl">


          <div className="mb-4">


          </div>

          <p
            ref={subtitleRef}
            className="mt-6 md:mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed font-light">

            Connecting global industries through reliable scrap metal trading.
          </p>
          <p
            ref={subtitleRef}
            className="mt-6 md:mt-3 text-lg md:text-s text-white/50 max-w-2xl leading-relaxed"
          >

            Middle East · Africa · Europe · Asia — since 1950.
          </p>
          <div className="mb-26"></div>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2563eb] text-white font-medium text-sm hover:bg-[#1d4ed8] transition-colors duration-300"
            >
              Explore Services
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="bounce">
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}
