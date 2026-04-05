import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Teacher",
    content: "After years of struggling with chronic fatigue, Maingrace247's herbal treatment program completely transformed my life. I feel more energetic than I have in decades.",
    rating: 5,
  },
  {
    name: "Emmanuel Nwachukwu",
    role: "Business Owner",
    content: "The personalized attention and natural remedies provided here are exceptional. My digestive issues have improved significantly after just two months of treatment.",
    rating: 5,
  },
  {
    name: "Funke Adeleke",
    role: "Nurse",
    content: "As a healthcare professional, I was skeptical at first. But the results speak for themselves. Their approach to holistic healing is both scientific and compassionate.",
    rating: 5,
  },
  {
    name: "Chidi Eze",
    role: "Engineer",
    content: "The herbal supplements recommended by Maingrace247 have helped manage my blood pressure naturally. I'm grateful for their expertise and care.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden border-y-8 border-primary">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="inline-block text-primary font-bold text-sm tracking-[0.3em] uppercase border-l-4 border-primary pl-4 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-8">
            Stories of <span className="text-accent italic">Healing & Hope</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            Hear from our patients who have experienced the transformative power of 
            traditional medicine and natural healing.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="rounded-none bg-muted border-none shadow-card hover:bg-white transition-all duration-500 border-l-8 border-accent"
            >
              <CardContent className="p-10 md:p-12">
                {/* Quote & Rating */}
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 bg-primary flex items-center justify-center shadow-elevated">
                    <Quote className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-foreground font-serif leading-relaxed mb-10 italic font-bold">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-5 pt-8 border-t border-border">
                  <div className="w-14 h-14 bg-accent flex items-center justify-center text-white font-bold text-xl shadow-card">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground uppercase tracking-tight">{testimonial.name}</p>
                    <p className="text-sm font-bold text-primary uppercase tracking-[0.2em]">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none hidden xl:block">
        <span className="text-[120px] font-serif font-bold text-primary whitespace-nowrap -rotate-90">
          RECOVERY
        </span>
      </div>
    </section>
  );
};

export default TestimonialsSection;
