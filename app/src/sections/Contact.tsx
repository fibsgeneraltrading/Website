import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: Phone,
    label: "UAE Phone",
    values: ["+971 4 123 4567", "+971 4 765 4321"],
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    values: ["Lebanon: +961 3 123 456", "Emirates: +971 50 123 4567"],
  },
  {
    icon: MapPin,
    label: "Address",
    values: ["P.O. Box 12345", "Jebel Ali, Dubai, UAE"],
  },
  {
    icon: Mail,
    label: "Email",
    values: ["manager@fibstrading.com", "info@fibstrading.com", "salwa@fibstrading.com"],
  },
  {
    icon: Clock,
    label: "Fax",
    values: ["+971 4 123 4568"],
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        rightRef.current!.children,
        { opacity: 0, y: 30 },
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
      id="contact"
      ref={sectionRef}
      className="w-full py-24 md:py-32 lg:py-40 bg-[#1a1a1a] text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div ref={leftRef}>
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2563eb] mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold leading-[1.1] tracking-[-1.5px] text-white mb-6">
              Connect with us
            </h2>
            <p className="text-base md:text-lg text-[#949494] leading-relaxed mb-10 max-w-lg">
              Whether you're looking to source scrap metals, explore partnership opportunities, or need logistics support — our team is ready to assist you.
            </p>

            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#949494]">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Clock size={18} className="text-[#2563eb]" />
                </div>
                <div>
                  <div className="text-sm text-white">Business Hours</div>
                  <div className="text-xs">Sunday - Thursday: 8:00 AM - 6:00 PM GST</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#949494]">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin size={18} className="text-[#2563eb]" />
                </div>
                <div>
                  <div className="text-sm text-white">Headquarters</div>
                  <div className="text-xs">Jebel Ali Free Zone, Dubai, UAE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Cards */}
          <div ref={rightRef} className="space-y-4">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  className="liquid-glass-dark rounded-xl p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#2563eb]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/60 mb-2">
                        {detail.label}
                      </div>
                      <div className="space-y-1">
                        {detail.values.map((value) => (
                          <div
                            key={value}
                            className="text-sm md:text-base text-white"
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Button */}
            <a
              href="mailto:info@fibstrading.com"
              className="inline-flex items-center gap-2 w-full justify-center px-8 py-4 rounded-full bg-[#2563eb] text-white font-medium text-sm hover:bg-[#1d4ed8] transition-colors duration-300 mt-4"
            >
              Send us a Message
              <Send size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
