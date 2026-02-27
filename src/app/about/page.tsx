import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | FreshPantry",
  description: "Learn about FreshPantry - your trusted source for premium food ingredients and specialty cooking supplies.",
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 to-rose-700 py-16">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About FreshPantry</h1>
          <p className="text-red-100 text-lg max-w-2xl">
            Your trusted source for premium food ingredients and specialty cooking supplies.
          </p>
        </div>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { number: "500+", label: "Products", icon: "🥘" },
            { number: "1000+", label: "Happy Customers", icon: "😊" },
            { number: "Nationwide", label: "Delivery", icon: "🚚" },
            { number: "24/7", label: "Support", icon: "💬" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-700 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                New Zealand's Premium Food Ingredients Marketplace
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FreshPantry is a leading provider of premium food ingredients and specialty cooking supplies. 
                We specialize in delivering high-quality ingredients to home cooks, professional chefs, and food businesses across New Zealand.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With years of experience in the culinary industry, we understand the importance of quality ingredients 
                in creating exceptional dishes. Our extensive product range includes organic spices, specialty flours, 
                premium oils, artisan sauces, baking essentials, and hard-to-find international ingredients.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Organic Options", "Ethically Sourced", "Bulk Discounts"].map((tag, idx) => (
                  <span key={idx} className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <span className="text-8xl mb-4 block">🍳</span>
                <p className="text-red-700 font-semibold">Premium Culinary Ingredients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-red-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-red-700 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
              Empowering Culinary Excellence Across New Zealand
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide our customers with the finest food ingredients at competitive prices, 
              backed by exceptional customer service and expert culinary advice. We believe that everyone 
              deserves access to premium-quality ingredients that make cooking simple, enjoyable, 
              and delicious.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="text-red-700 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              The FreshPantry Difference
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏆",
                title: "Premium Quality",
                desc: "We source only the finest ingredients from trusted suppliers and artisan producers worldwide.",
              },
              {
                icon: "💰",
                title: "Competitive Pricing",
                desc: "Get the best value with our competitive prices and bulk discount options for restaurants and cafes.",
              },
              {
                icon: "🚀",
                title: "Fast Nationwide Delivery",
                desc: "Quick and reliable delivery across New Zealand. Free shipping on orders over $100.",
              },
              {
                icon: "👨‍🍳",
                title: "Expert Support",
                desc: "Our culinary team is here to help you find the perfect ingredients for your recipes.",
              },
              {
                icon: "🔄",
                title: "Easy Returns",
                desc: "Not satisfied? Our hassle-free 30-day return policy has you covered.",
              },
              {
                icon: "🌿",
                title: "Organic Options",
                desc: "We offer certified organic and sustainably sourced ingredients for conscious cooks.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <span className="text-8xl mb-4 block">👨‍🍳</span>
                <p className="text-red-700 font-semibold">Trusted by Chefs</p>
              </div>
            </div>
            <div>
              <span className="text-red-700 font-semibold text-sm uppercase tracking-wider">Our Values</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                What Drives Us Every Day
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Customer First", desc: "Your satisfaction is our top priority in everything we do." },
                  { title: "Quality Assurance", desc: "We never compromise on the quality of our ingredients." },
                  { title: "Integrity", desc: "Honest pricing, transparent sourcing, and ethical business practices." },
                  { title: "Innovation", desc: "Continuously expanding our range to bring you the latest culinary trends." },
                ].map((value, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-700 to-rose-700 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Cooking?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Browse our extensive range of premium food ingredients and discover why chefs 
            across New Zealand trust FreshPantry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors">
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-red-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-900 transition-colors border border-red-600">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
      <Footer showNewsletter={true} />
    </main>
  );
}
