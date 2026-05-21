import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface IsometricHeroTextProps {
  text: string;
  className?: string;
}

export default function IsometricHeroText({ text, className = "" }: IsometricHeroTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const split = new SplitType(containerRef.current, { types: "lines,words" });

    document.fonts.ready.then(() => {
      split.split({});
    });

    const words = containerRef.current!.querySelectorAll(".word");

    words.forEach((word) => {
      gsap.fromTo(
        word,
        {
          opacity: 0,
          y: 40,
          rotateY: 90,
          skewX: -30,
          transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          skewX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            amount: 0.5,
            from: "start",
          },
          transformOrigin: "0% 50%",
        }
      );
    });

    return () => {
      split.revert();
    };
  }, [text]);

  return (
    <h1
      ref={containerRef}
      className={`text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold leading-[1.3] tracking-[-2.46px] text-white ${className}`}
      style={{ perspective: "1000px" }}
    >
      {text}
    </h1>
  );
}
