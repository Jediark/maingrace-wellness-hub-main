import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import drGrace from "@/assets/dr-grace.png";
import staffHerbalist from "@/assets/staff-herbalist.png";
import staffWellness from "@/assets/staff-wellness.png";

const staff = [
  {
    name: "Dr. (Mrs) Folashade Adetifa Dawodu",
    role: "Chief Executive Officer & Visionary",
    description: "A specialist in tradomedical healing with over 20 years of experience integrating ancestral wisdom with modern wellness standards.",
    image: drGrace,
  },
  {
    name: "Emmanuel Okon",
    role: "Sales Representative",
    description: "A results-driven sales professional with a passion for natural wellness. Emmanuel bridges the gap between our traditional healing solutions and the individuals who need them most, ensuring seamless access to our therapeutic botanical range.",
    image: staffHerbalist,
  },
  {
    name: "Victoria Adeyemi",
    role: "Sales Representative",
    description: "Expert in patient guidance and holistic product selection, providing personalized support and natural wellness plans for your health journey.",
    image: staffWellness,
  },
];

const MeetOurStaff = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="inline-block text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 border-l-4 border-primary pl-4">
            Our Professionals
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-8">
            The Experts Behind Your <br />
            <span className="text-accent italic">Natural Healing Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Meet the dedicated team of traditional practitioners and clinical specialists 
            committed to restoring your health through the power of botanical medicine.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member, index) => (
            <div key={index} className="group bg-card border-2 border-border p-6 shadow-card hover:border-primary transition-all duration-300">
              {/* Image Container (Solid, No Overlays) */}
              <div className="aspect-[4/5] overflow-hidden grayscale-0 group-hover:grayscale-0 transition-all duration-500 mb-8 border-4 border-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-accent font-bold text-xs uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {member.description}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Link to="#" className="w-10 h-10 bg-accent text-white flex items-center justify-center hover:bg-primary transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </Link>
                  <Link to="#" className="w-10 h-10 bg-muted text-foreground flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Button variant="hero" size="xl" className="group rounded-none bg-accent border-4 border-white shadow-elevated" asChild>
            <Link to="/about">
              See Full Clinical Team
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetOurStaff;
