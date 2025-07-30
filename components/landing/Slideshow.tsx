"use client";
import { useState, useEffect } from "react";

const slides = [
  "/images/undraw_slide1.svg",
  "/images/undraw_slide2.svg",
  "/images/undraw_slide3.svg",
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto mt-8">
      <img
        src={slides[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 object-contain transition-opacity duration-700"
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-teal-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
