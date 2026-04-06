import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroGarden from "@/assets/hero-garden.png";
import heroPrep from "@/assets/hero-prep.png";
import heroHealing from "@/assets/hero-healing.png";

const slides = [
  {
    image: heroGarden,
    title: "For Every Human Illness,",
    highlight: "Nature Provides a Cure",
    subtitle: "Maingrace Tradomedical Services",
    description: "Discover the healing wisdom of the earth. Our botanical remedies are pure, potent, and rooted in generations of traditional knowledge.",
  },
  {
    image: heroPrep,
    title: "Ancestral Wisdom,",
    highlight: "Expertly Hand-Crafted",
    subtitle: "Precision & Tradition",
    description: "Every formula is prepared with meticulous care, combining ancient secrets with modern safety standards for optimal healing.",
  },
  {
    image: heroHealing,
    title: "Pure Botanical Power,",
    highlight: "Generations of Health",
    subtitle: "Holistic Wellness",
    description: "Experience the profound benefits of 100% natural healing. Safe for all ages, with no side effects, only pure restoration.",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b-8 border-primary">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay to ensure readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
      
      {/* Content Overlay - Centered Patterns from Services Page */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block text-primary font-bold text-sm tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-top duration-700">
            {slides[currentSlide].subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
            {slides[currentSlide].title} <br />
            <span className="text-primary italic">{slides[currentSlide].highlight}</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-300">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-500 max-w-sm mx-auto sm:max-w-none">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group rounded-none bg-primary border-4 border-white shadow-elevated" asChild>
              <Link to="/consultation">
                Book Consultation
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto rounded-none border-4 border-white font-bold uppercase tracking-widest bg-transparent text-white hover:bg-white hover:text-primary transition-all shadow-elevated" asChild>
              <Link to="/shop">View Catalog</Link>
            </Button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
