import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import healingHandsImage from "@/assets/maingrace-logo.webp";

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
            <div className="relative rounded-xl overflow-hidden shadow-card border-2 border-primary">
              <img
                src={healingHandsImage}
                alt="Healing hands holding medicinal herbs"
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
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
                I am your trusted Health and Herbal Consultant, dedicated to helping 
                people care for their health naturally through detox, massage, blood 
                pressure and blood sugar checks, simple health tests, diagnosis referrals, 
                and herbal wellness support based on test results.
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
