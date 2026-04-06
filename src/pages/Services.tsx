import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, MessageSquare, Leaf, Heart, Pill, BookOpen } from "lucide-react";
import advertFlyer from "@/assets/advert-flyer.jpeg";
import servicesHero from "@/assets/services-hero.png";

const healthConditions = [
  { name: "Malaria/Typhoid", category: "Infections" },
  { name: "Fibroids", category: "Women's Health" },
  { name: "High/Low Blood Pressure", category: "Cardiovascular" },
  { name: "Prostate Disease", category: "Men's Health" },
  { name: "Cancers/Tumors", category: "Chronic Care" },
  { name: "Immune Booster", category: "General Wellness" },
  { name: "Female/Male Infertility", category: "Fertility" },
  { name: "Hepatitis", category: "Liver Health" },
  { name: "Diabetes/Overweight", category: "Metabolic" },
  { name: "Asthma/Tuberculosis", category: "Respiratory" },
  { name: "Ulcers", category: "Digestive" },
  { name: "Arthritis/Rheumatism", category: "Bone & Joint" },
  { name: "Liver Diseases", category: "Liver Health" },
  { name: "Back/Waist Pains", category: "Pain Management" },
  { name: "Kidney Diseases", category: "Kidney Health" },
  { name: "STI/STD", category: "Sexual Health" },
  { name: "Eye Infections", category: "Eye Health" },
  { name: "Stroke Control", category: "Cardiovascular" },
  { name: "Stress/Headache", category: "Mental Wellness" },
  { name: "Libido Booster", category: "Sexual Health" },
  { name: "Bone Infections", category: "Bone & Joint" },
  { name: "Ovarian Failure", category: "Women's Health" },
  { name: "Lungs Disease", category: "Respiratory" },
  { name: "Menstrual Disorder", category: "Women's Health" },
  { name: "Insomnia (Poor Sleeping Habit)", category: "Mental Wellness" },
  { name: "Micropenis Remedy", category: "Men's Health" },
  { name: "Anemia (Sickle Cell Crisis)", category: "Blood Disorders" },
  { name: "Hormonal Imbalance", category: "Hormonal" },
  { name: "Amnesia (Loss of Memories)", category: "Mental Wellness" },
  { name: "Premature Ejaculation", category: "Men's Health" },
  { name: "Aphrodisiacs", category: "Sexual Health" },
];

const serviceCategories = [
  {
    icon: Stethoscope,
    title: "General Health Check-up & Treatment",
    description: "Comprehensive wellness assessments using traditional diagnostic methods to understand your body's unique needs.",
    featured: true,
  },
  {
    icon: MessageSquare,
    title: "Counselling",
    description: "Professional health counselling to guide you through your wellness journey with personalized advice.",
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
    title: "Chronic Care Management",
    description: "Long-term holistic treatment plans for managing chronic conditions through natural healing approaches.",
    featured: false,
  },
  {
    icon: Pill,
    title: "Natural Supplements",
    description: "Premium quality herbal supplements to support your daily wellness and vitality.",
    featured: false,
  },
  {
    icon: BookOpen,
    title: "Wellness Education",
    description: "Learn about traditional medicine practices and how to maintain optimal health naturally.",
    featured: false,
  },
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Infections": "bg-red-100 text-red-700",
    "Women's Health": "bg-pink-100 text-pink-700",
    "Cardiovascular": "bg-purple-100 text-purple-700",
    "Men's Health": "bg-blue-100 text-blue-700",
    "Chronic Care": "bg-orange-100 text-orange-700",
    "General Wellness": "bg-green-100 text-green-700",
    "Fertility": "bg-rose-100 text-rose-700",
    "Liver Health": "bg-amber-100 text-amber-700",
    "Metabolic": "bg-yellow-100 text-yellow-700",
    "Respiratory": "bg-cyan-100 text-cyan-700",
    "Digestive": "bg-lime-100 text-lime-700",
    "Bone & Joint": "bg-stone-100 text-stone-700",
    "Pain Management": "bg-red-100 text-red-700",
    "Kidney Health": "bg-teal-100 text-teal-700",
    "Sexual Health": "bg-fuchsia-100 text-fuchsia-700",
    "Eye Health": "bg-indigo-100 text-indigo-700",
    "Mental Wellness": "bg-violet-100 text-violet-700",
    "Blood Disorders": "bg-rose-100 text-rose-700",
    "Hormonal": "bg-amber-100 text-amber-700",
  };
  return colors[category] || "bg-gray-100 text-gray-700";
};

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={servicesHero}
            alt="Natural herbal medicine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
              Medical Consultation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl botanical-h1 mb-6 text-white text-center">
              Comprehensive Natural <span className="text-primary italic">Healing Solutions</span>
            </h1>
            <p className="text-lg md:text-xl botanical-text text-white/90 text-center">
              For every human illness there exist a plant which is the cure. Our herbal remedy 
              is affordable, good for all ages & genders with no side effects.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((service) => (
              <Card 
                key={service.title}
                variant={service.featured ? "feature" : "bento"}
                className="group cursor-pointer h-full hover:shadow-elevated transition-all duration-300"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    service.featured 
                      ? "bg-gradient-to-br from-primary to-accent shadow-glow" 
                      : "bg-primary/10"
                  }`}>
                    <service.icon className={`w-8 h-8 ${
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

      {/* Health Conditions We Treat */}
      <section className="py-20 lg:py-32 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
              Our Services Include
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Health Conditions <span className="gradient-text">We Treat</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We specialize in treating a wide range of health conditions using traditional herbal remedies.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {healthConditions.map((condition, index) => (
              <div 
                key={condition.name}
                className="bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {condition.name}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(condition.category)}`}>
                      {condition.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-8 text-lg">
            ...and many more conditions. Contact us for a consultation.
          </p>
        </div>
      </section>

      {/* Flyer Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase">
                Our Offerings
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Complete Health <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We also deal in natural cocoa tea, natural honey, and all kinds of local/international 
                herbal products. Regenerate your body and reverse diseases with healing herbs.
              </p>
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <p className="text-xl font-serif font-bold text-primary mb-2">
                  "HEALTH IS WEALTH"
                </p>
                <p className="text-muted-foreground">
                  Invest in your health today with our natural, affordable, and effective remedies.
                </p>
              </div>
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/consultation">
                  Book Your Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img
                src={advertFlyer}
                alt="Maingrace Tradomedical Services - Our Services"
                className="relative w-full h-auto rounded-2xl shadow-elevated"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detoxification Videos Section */}
      <section className="py-20 lg:py-32 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
              Watch & Learn
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Detoxification <span className="gradient-text">Videos</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn about our detoxification process and see the power of natural healing in action.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl overflow-hidden shadow-elevated">
              <video 
                controls 
                className="w-full aspect-video object-cover"
                poster="/videos/detoxification-1.mp4"
              >
                <source src="/videos/detoxification-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Detoxification Process 1</h3>
                <p className="text-muted-foreground text-sm">Natural body cleansing</p>
              </div>
            </div>
            
            <div className="bg-card rounded-2xl overflow-hidden shadow-elevated">
              <video 
                controls 
                className="w-full aspect-video object-cover"
              >
                <source src="/videos/detoxification-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Detoxification Process 2</h3>
                <p className="text-muted-foreground text-sm">Herbal cleansing techniques</p>
              </div>
            </div>
            
            <div className="bg-card rounded-2xl overflow-hidden shadow-elevated">
              <video 
                controls 
                className="w-full aspect-video object-cover"
              >
                <source src="/videos/detoxification-3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Detoxification Process 3</h3>
                <p className="text-muted-foreground text-sm">Complete wellness restoration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Start Your <span className="gradient-text">Healing Journey</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a consultation today and discover how our traditional medicine approaches 
            can help you achieve optimal health and wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto sm:max-w-none">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group rounded-none" asChild>
              <Link to="/consultation">
                Book Your Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto rounded-none border-2 border-primary font-bold hover:bg-muted" asChild>
              <Link to="/remote-consultation">
                Remote Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
