import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  [
    "/images/fibs-1.jpeg",
    "/images/fibs-2.jpeg",
    "/images/gallery-yard.jpg",
    "/images/fibs-3.jpeg",
  ],
  [
    "/images/gallery-ship.jpg",
    "/images/fibs-4.jpeg",
    "/images/fibs-5.jpeg",
    "/images/gallery-port.jpg",
  ],
  [
    "/images/fibs-6.jpeg",
    "/images/gallery-facility.jpg",
    "/images/fibs-7.jpeg",
    "/images/gallery-copper.jpg",
  ],
];

const aspectRatios = [
  ["aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"],
  ["aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"],
  ["aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"],
];

export default function MonumentGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotateYMap = useRef<Map<HTMLElement, number>>(new Map());
  const tiltedMap = useRef<Map<HTMLElement, boolean>>(new Map());

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const galleryImages = gsap.utils.toArray<HTMLElement>(".gallery-img-wrap");

      galleryImages.forEach((img) => {
        const centerX = window.innerWidth / 2;
        const maxDistance = Math.max(centerX, window.innerWidth - centerX);
        const rect = img.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - imgCenterX);
        const rotateY = ((distance / maxDistance) * 20 - 3) * -1;

        rotateYMap.current.set(img, rotateY);
        tiltedMap.current.set(img, true);

        gsap.set(img, { transformPerspective: 1200, rotateY });
      });

      const targetYs = [0, 0];
      [0, 2].forEach((colIndex, i) => {
        gsap.to(columnRefs.current[colIndex], {
          y: targetYs[i],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isTilted = tiltedMap.current.get(el) ?? true;
    const savedRotateY = rotateYMap.current.get(el) ?? 0;

    if (isTilted) {
      gsap.to(el, { rotateY: 0, y: -6, duration: 0.4, ease: "power2.out" });
      el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)";
      tiltedMap.current.set(el, false);
    } else {
      gsap.to(el, { rotateY: savedRotateY, y: -6, duration: 0.4, ease: "power2.out" });
      el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)";
      tiltedMap.current.set(el, true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isTilted = tiltedMap.current.get(el) ?? true;
    const savedRotateY = rotateYMap.current.get(el) ?? 0;

    gsap.to(el, {
      rotateY: isTilted ? savedRotateY : 0,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
    });
    el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)";
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f8f8f8] py-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 px-3 md:px-4 items-start">
        {columns.map((colImages, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col gap-3 md:gap-4"
            ref={(el) => { columnRefs.current[colIndex] = el; }}
            style={{ marginTop: "0px" }}
          >
            {colImages.map((src, imgIndex) => (
              <div
                key={imgIndex}
                className={`gallery-img-wrap group w-full aspect-[4/3] ${aspectRatios[colIndex][imgIndex]} rounded-2xl overflow-hidden`}
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={src}
                  alt={`Gallery ${colIndex * 4 + imgIndex + 1}`}
                  className="w-full h-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
