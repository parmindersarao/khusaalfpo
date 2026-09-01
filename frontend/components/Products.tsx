"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useTranslations } from "next-intl";

const products = [
  {
    id: 1,
    name: "Maxistart",
    description:
      "Maxistart is a dairy nutrition supplement that supports early rumen development, improves feed intake, and helps young calves and cattle grow steadily with better digestion and stronger performance.",
    contact: "+91 98765 43210",
    image: "/products/Bag-Denkamilk-Maxistart.webp",
  },
  {
    id: 2,
    name: "Bio Fertilizer Pack",
    description:
      "Bio Fertilizer Pack is a natural soil-enrich product that supports healthy root development, improves nutrient uptake, and encourages stronger crop growth with better soil vitality.",
    contact: "+91 98765 43210",
    image: "/products/Packshot-Exolium-Skin-protection-spray.png",
  },
];

// Auto-scroll speed: pixels moved per frame. Lower = slower.
const AUTO_SCROLL_SPEED = 0.6;
// How long (ms) to stay paused after a manual arrow click before auto-scroll resumes
const RESUME_DELAY_AFTER_CLICK = 2500;

export default function Products() {
  const t = useTranslations("Products");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Continuous auto-scroll loop
  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    const step = () => {
      if (!isPausedRef.current && track) {
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 1) {
          // Reached the end — loop back to the start
          track.scrollLeft = 0;
        } else {
          track.scrollLeft += AUTO_SCROLL_SPEED;
        }
      }
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const pauseTemporarily = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY_AFTER_CLICK);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16 // gap
      : 260;

    // Pause auto-scroll briefly so it doesn't fight the manual click
    pauseTemporarily();

    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <h2 className="text-xl sm:text-3xl font-bold text-green-800">
          {t("title")}
        </h2>

        {/* Arrow controls — hidden on mobile, mobile users swipe instead */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* Slider track — auto-scrolls slowly, pauses on hover, swipeable on touch */}
      <div
        ref={scrollRef}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onTouchStart={() => (isPausedRef.current = true)}
        onTouchEnd={pauseTemporarily}
        className="flex gap-4 overflow-x-auto snap-x snap-proximity pb-2 hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[62%] xs:w-[55%] sm:w-[45%] md:w-[23%] bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 text-center">
                {product.name}
              </h3>
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full bg-green-700 hover:bg-green-800 transition text-white text-xs sm:text-sm font-medium py-2 rounded-md"
              >
                {t("viewProduct")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold text-green-800">{selectedProduct.name}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-800 text-xl"
                aria-label="Close product details"
              >
                ×
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-50 h-60 object-cover rounded-xl mb-4"
              />
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-6">
              {selectedProduct.description}
            </p>

            <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-900">
              <span className="font-semibold">Contact for more info: </span>
              {selectedProduct.contact}
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-5 w-full bg-green-700 hover:bg-green-800 transition text-white font-medium py-2.5 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}