import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, Heart } from "lucide-react";

const HeroIntro = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-6">
              <span className="inline-block text-primary font-bold text-sm tracking-[0.3em] uppercase border-l-4 border-primary pl-4">
                Holistic Wellness
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1]">
                Pure Botanical Power, <br />
                <span className="text-accent italic">Generations of Health</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                Experience the profound benefits of 100% natural healing. 
                Safe for all ages, with no side effects, only pure restoration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button variant="hero" size="xl" className="group rounded-none bg-accent border-4 border-white shadow-elevated px-10" asChild>
                <Link to="/consultation">
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="rounded-none border-4 border-accent text-accent hover:bg-accent hover:text-white px-10 font-bold" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>

          {/* Feature Highlights Grid (Solid, Premium) */}
          <div className="grid sm:grid-cols-2 gap-6 animate-fade-in-right">
            <div className="bg-muted p-8 border-b-8 border-primary">
              <Leaf className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-serif font-bold mb-3">Ancestral Wisdom</h3>
              <p className="text-muted-foreground font-medium">Expertly hand-crafted formulas passed through generations of traditional knowledge.</p>
            </div>
            <div className="bg-accent p-8 border-t-8 border-white text-white">
              <Shield className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-serif font-bold mb-3">Modern Safety</h3>
              <p className="text-white/80 font-medium">Combining ancient secrets with modern safety standards for optimal, reliable healing.</p>
            </div>
            <div className="bg-primary p-8 border-r-8 border-white text-white">
              <Heart className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-serif font-bold mb-3">Holistic Care</h3>
              <p className="text-white/80 font-medium">Every formula is prepared with meticulous care, focusing on total body restoration.</p>
            </div>
            <div className="bg-white p-8 border-2 border-border shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Nature's Cure</h3>
              <p className="text-muted-foreground font-medium">For every human illness, nature provides a cure. We help you find yours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-5 pointer-events-none hidden xl:block">
        <span className="text-[200px] font-serif font-bold text-accent whitespace-nowrap rotate-90">
          BOTANICAL
        </span>
      </div>
    </section>
  );
};

export default HeroIntro;
