"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  _count: { Product: number };
};

// High-quality food ingredient images
const categoryImages: Record<string, string> = {
  "spices-herbs": "https://images.unsplash.com/photo-1596040033229-a0b3b1e1c7e7?w=400&q=80",
  "baking-essentials": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
  "grains-pulses": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
  "oils-vinegars": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
  "sweeteners": "https://images.unsplash.com/photo-1587049352846-4a222e784422?w=400&q=80",
  "nuts-seeds": "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80",
  "dried-fruits": "https://images.unsplash.com/photo-1577003833154-a2e6b68e5b1e?w=400&q=80",
};

// Category icons/emojis
const categoryIcons: Record<string, string> = {
  "spices-herbs": "🌿",
  "baking-essentials": "🧁",
  "grains-pulses": "🌾",
  "oils-vinegars": "🫒",
  "sweeteners": "🍯",
  "nuts-seeds": "🥜",
  "dried-fruits": "🍇",
};

const getImage = (slug: string): string => {
  return categoryImages[slug] || "https://images.unsplash.com/photo-1596040033229-a0b3b1e1c7e7?w=400&q=80";
};

const getIcon = (slug: string): string => {
  return categoryIcons[slug] || "🍴";
};

const BrowseByCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className={cn([integralCF.className, "text-3xl md:text-4xl text-black mb-2"])}>
                SHOP BY CATEGORY
              </h2>
              <p className="text-gray-600 text-lg">Find exactly what you need</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded mx-auto w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className={cn([integralCF.className, "text-3xl md:text-4xl text-black mb-2"])}>
              SHOP BY CATEGORY
            </h2>
            <p className="text-gray-600 text-lg">Find exactly what you need</p>
          </div>
          <Link 
            href="/shop" 
            className="hidden md:flex items-center gap-2 text-red-700 hover:text-red-800 font-bold transition-colors text-lg"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/category/${category.slug}`}
              className="group relative bg-white hover:bg-red-50 rounded-2xl p-6 text-center transition-all duration-300 shadow-md hover:shadow-xl border-2 border-transparent hover:border-red-200"
            >
              {/* Icon Badge */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
                {getIcon(category.slug)}
              </div>

              {/* Image */}
              <div className="w-24 h-24 mx-auto mb-4 relative bg-gray-50 rounded-xl overflow-hidden shadow-inner">
                <Image
                  src={getImage(category.slug)}
                  alt={category.name}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to default image
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596040033229-a0b3b1e1c7e7?w=400&q=80";
                  }}
                />
              </div>
              
              {/* Content */}
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-red-700 transition-colors leading-tight">
                {category.name}
              </h3>
              
              {/* Product Count */}
              {category._count?.Product > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {category._count.Product} {category._count.Product === 1 ? 'item' : 'items'}
                </p>
              )}

              {/* Hover Arrow */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 mx-auto text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-3 rounded-full transition-all shadow-lg"
          >
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
