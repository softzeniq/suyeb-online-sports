"use client";
import { Button } from "@/components/ui/button";
import { useSliderSlides } from "@/hooks/useShopData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function HeroSlider() {
  const {
    data: slides = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useSliderSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isStuck, setIsStuck] = useState(false);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!(isLoading || isFetching)) {
      setIsStuck(false);
      return;
    }
    const t = window.setTimeout(() => setIsStuck(true), 10000);
    return () => window.clearTimeout(t);
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 7000); // 7 seconds slide intervals for readable text
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (isError) {
    return (
      <section className="relative overflow-hidden bg-secondary h-[300px] md:h-[400px] lg:h-[460px] w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
          <p className="text-muted-foreground font-medium">
            Couldn't load the slider.{" "}
            {error instanceof Error ? error.message : ""}
          </p>
          <Button className="btn-accent" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (isLoading || isFetching) {
    return (
      <section className="relative overflow-hidden bg-secondary h-[300px] md:h-[400px] lg:h-[460px] w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent" />
          {isStuck && (
            <Button className="btn-accent" onClick={() => refetch()}>
              Loading too long — Retry
            </Button>
          )}
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative overflow-hidden bg-secondary h-[300px] md:h-[400px] lg:h-[460px] w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground font-semibold">No slides configured</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-4 md:pb-6 pt-0">
      {/* Slider Container */}
      <div className="relative overflow-hidden group w-full h-[300px] md:h-[400px] lg:h-[460px]">
        
        {/* Slides */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Left Vignette Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10 pointer-events-none" />

              {/* Background Image with Ken Burns animation */}
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                priority={index === 0}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
                sizes="(max-width: 768px) 100vw, 90vw"
              />

              {/* Slide Content Layer */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container-shop w-full px-6 md:px-12 lg:px-16">
                  <div className="max-w-xl md:max-w-2xl text-white flex flex-col gap-3 md:gap-5">
                    {/* Badge */}
                    <span 
                      className={`text-xs md:text-sm font-bold tracking-widest uppercase text-accent transition-all duration-700 delay-200 transform ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      New Arrival
                    </span>
                    {/* Heading */}
                    <h1 
                      className={`text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight transition-all duration-700 delay-400 transform ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {slide.heading}
                    </h1>
                    {/* Paragraph text */}
                    <p 
                      className={`text-sm md:text-lg text-white/80 line-clamp-3 md:line-clamp-none transition-all duration-700 delay-600 transform ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {slide.text}
                    </p>
                    {/* Button */}
                    <div 
                      className={`mt-2 md:mt-4 transition-all duration-700 delay-800 transform ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      <Link href={slide.cta_link}>
                        <Button 
                          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2.5 md:px-8 md:py-3.5 font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-accent/20 active:scale-95 duration-300"
                        >
                          {slide.cta_text || "Shop Now"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/25 hover:bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/25 hover:bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </>
        )}
      </div>

      {/* Pill Indicators */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-accent"
                  : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
