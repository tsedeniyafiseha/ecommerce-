"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1596040033229-a0b3b1e1c7e7?w=1200&q=90",
    title: "Premium Organic Spices",
    subtitle: "Sourced from the finest farms worldwide",
    badge: "NEW ARRIVALS"
  },
  {
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=90",
    title: "Artisan Oils & Vinegars",
    subtitle: "Cold-pressed and naturally aged",
    badge: "BEST SELLERS"
  },
  {
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=90",
    title: "Superfood Grains",
    subtitle: "Nutrient-rich and naturally gluten-free",
    badge: "ORGANIC"
  },
  {
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1200&q=90",
    title: "Gourmet Pasta & Grains",
    subtitle: "Authentic Italian and artisan varieties",
    badge: "PREMIUM"
  },
  {
    image: "https://images.unsplash.com/photo-1452251889946-8ff5ea7f27f3?w=1200&q=90",
    title: "Fresh Organic Produce",
    subtitle: "Farm-fresh vegetables and fruits daily",
    badge: "FRESH TODAY"
  },
  {
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=90",
    title: "Specialty Coffee & Tea",
    subtitle: "Single-origin beans and premium blends",
    badge: "EXCLUSIVE"
  },
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-b from-red-50 to-white py-8">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Hero - Carousel */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[500px] shadow-2xl shadow-red-500/20">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Large Image Background - More Visible */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Gradient overlay with subtle red tint on left side */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl">
                  <span className="inline-block bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 w-fit shadow-lg">
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-white text-xl md:text-2xl mb-8 font-medium drop-shadow-lg">{slide.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-sm">100% Organic</span>
                    </div>
                    <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-sm">Free Shipping</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link
                      href="/shop"
                      className="inline-flex items-center justify-center bg-red-600 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      Shop Now
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/30 transition-all border-2 border-white/50"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentSlide ? "bg-white w-8" : "bg-white/50 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - 2 Bold Cards */}
          <div className="flex flex-col gap-6">
            {/* Card 1 - Spices */}
            <div className="relative rounded-3xl overflow-hidden h-[240px] group cursor-pointer shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute inset-0">
                <Image 
                  src="https://images.unsplash.com/photo-1596040033229-a0b3b1e1c7e7?w=600&q=90" 
                  alt="Spices" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <span className="text-white/90 text-xs font-bold mb-2 tracking-wider">EXPLORE</span>
                <h3 className="text-3xl font-black text-white mb-4 drop-shadow-lg">Spices & Herbs</h3>
                <Link 
                  href="/shop/category/spices-herbs" 
                  className="inline-flex items-center justify-center bg-white text-gray-900 font-bold px-6 py-3 rounded-full text-sm w-fit hover:bg-gray-100 transition-all shadow-lg group-hover:scale-105"
                >
                  Shop Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2 - Oils */}
            <div className="relative rounded-3xl overflow-hidden h-[240px] group cursor-pointer shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute inset-0">
                <Image 
                  src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=90" 
                  alt="Oils" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <span className="text-white/90 text-xs font-bold mb-2 tracking-wider">PREMIUM</span>
                <h3 className="text-3xl font-black text-white mb-4 drop-shadow-lg">Oils & Vinegars</h3>
                <Link 
                  href="/shop/category/oils-vinegars" 
                  className="inline-flex items-center justify-center bg-white text-gray-900 font-bold px-6 py-3 rounded-full text-sm w-fit hover:bg-gray-100 transition-all shadow-lg group-hover:scale-105"
                >
                  Shop Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
