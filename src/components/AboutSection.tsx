import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import healingHandsImage from "@/assets/maingrace-logo.webp";

const benefits = [
  "100% natural ingredients sourced ethically",
  "Personalized treatment plans",
  "No harmful side effects",
  "Centuries of proven healing wisdom",
  "Holistic approach to wellness",
  "Expert certified practitioners",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-48 w-96 h-96 bg-primary/5 blob" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={healingHandsImage}
                alt="Healing hands holding medicinal herbs"
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-gradient-to-br from-primary to-accent rounded-2xl p-6 shadow-elevated text-primary-foreground">
              <div className="text-center">
                <span className="block text-4xl font-serif font-bold">15+</span>
                <span className="text-sm opacity-90">Years of Excellence</span>
              </div>
            </div>
            
            {/* Decorative Border */}
            <div className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-3xl -z-10" />
          </div>
          
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                Rooted in Tradition, <span className="gradient-text">Healing for Today</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At MAINGRACE GLOBAL LIMITED, we believe in the profound healing power 
                of nature. Our practice combines ancestral wisdom with modern understanding to 
                provide you with safe, effective, and personalized natural health solutions.
              </p>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Founded on the principle that true health comes from harmony between body, mind, 
              and nature, we have dedicated over 15 years to helping thousands of patients 
              achieve optimal wellness through carefully crafted herbal remedies and holistic 
              care approaches.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button variant="hero" size="lg" className="mt-4">
              Learn More About Our Practice
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
