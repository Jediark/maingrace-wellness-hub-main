import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import healingHandsImage from "@/assets/maingrace-logo-premium.png";

const benefits = [
  "100% natural ingredients sourced ethically",
  "Personalized treatment plans",
  "No harmful side effects",
  "Centuries of proven healing wisdom",
];

const AboutPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-glow border-4 border-primary bg-accent/20 p-8 flex items-center justify-center">
              <img
                src={healingHandsImage}
                alt="MAINGRACE GLOBAL - Nature's Signature"
                className="w-full h-auto object-contain max-w-[80%]"
                loading="lazy"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-accent rounded-none p-6 shadow-elevated text-primary-foreground border-2 border-white">
              <div className="text-center">
                <span className="block text-4xl font-serif font-bold">15+</span>
                <span className="text-sm font-bold uppercase tracking-widest">Years of Excellence</span>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-primary font-bold text-sm tracking-wider uppercase mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                Rooted in Tradition, <span className="text-primary italic">Healing for Today</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                At MAINGRACE GLOBAL LIMITED, we believe in the profound healing power 
                of nature. Our practice combines ancestral wisdom with modern understanding to 
                provide you with safe, effective, and personalized natural health solutions.
              </p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-semibold">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button variant="hero" size="lg" className="group rounded-none font-bold" asChild>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
