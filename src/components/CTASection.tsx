import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Clock, MapPin } from "lucide-react";
import consultationImage from "@/assets/branded-herbal-shelf.png";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden border-t-8 border-primary">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div>
              <span className="inline-block text-accent font-bold text-sm tracking-[0.3em] uppercase border-l-4 border-accent pl-4 mb-6">
                Institutional Care
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-[1.1]">
                Begin Your Journey to{' '}
                <span className="text-primary italic">Natural Wellness</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed border-l-2 border-border pl-6 italic">
                Take the first step towards holistic health. Schedule a personalized consultation 
                with our practitioners and discover the healing power of 100% natural botanical systems.
              </p>
            </div>
            
            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-6 bg-muted border-l-4 border-primary">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">Direct Line</p>
                  <p className="font-serif font-bold text-lg">07013376463</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-muted border-l-4 border-accent">
                <div className="w-12 h-12 bg-accent flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">Clinic Hours</p>
                  <p className="font-serif font-bold text-lg">8:30 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button variant="hero" size="xl" className="group rounded-none bg-primary border-4 border-white shadow-elevated" asChild>
                <Link to="/consultation">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="rounded-none border-4 border-primary font-bold uppercase tracking-widest" asChild>
                <Link to="/contact">Send Inquiry</Link>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative border-8 border-primary shadow-elevated">
              <img
                src={consultationImage}
                alt="Traditional medicine consultation room"
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-accent p-8 shadow-elevated border-4 border-white text-white">
              <div className="text-center">
                <span className="block text-5xl font-serif font-bold mb-1">98%</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
