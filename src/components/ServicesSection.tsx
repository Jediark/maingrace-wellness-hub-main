import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf, Heart, Users, Pill, Stethoscope, BookOpen } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Health Consultation",
    description: "Comprehensive wellness assessments using traditional diagnostic methods to understand your body's unique needs.",
    featured: true,
  },
  {
    icon: Leaf,
    title: "Herbal Remedies",
    description: "Custom-formulated natural medicines prepared from carefully sourced medicinal plants and herbs.",
    featured: false,
  },
  {
    icon: Heart,
    title: "Chronic Care",
    description: "Long-term holistic treatment plans for managing chronic conditions through natural healing approaches.",
    featured: false,
  },
  {
    icon: Pill,
    title: "Natural Supplements",
    description: "Premium quality herbal supplements to support your daily wellness and vitality.",
    featured: true,
  },
  {
    icon: Users,
    title: "Family Wellness",
    description: "Comprehensive health programs designed for the whole family, from children to elders.",
    featured: false,
  },
  {
    icon: BookOpen,
    title: "Wellness Education",
    description: "Learn about traditional medicine practices and how to maintain optimal health naturally.",
    featured: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-muted relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Comprehensive Natural <span className="gradient-text">Healing Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We offer a wide range of tradomedical services designed to address your health concerns 
            through time-tested natural remedies and holistic approaches.
          </p>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              variant={service.featured ? "feature" : "bento"}
              className={`group cursor-pointer ${
                service.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  service.featured 
                    ? "bg-gradient-to-br from-primary to-accent shadow-glow" 
                    : "bg-primary/10"
                }`}>
                  <service.icon className={`w-7 h-7 ${
                    service.featured ? "text-primary-foreground" : "text-primary"
                  }`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
