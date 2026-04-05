import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Eye, Target, MapPin, Phone, Clock } from "lucide-react";
import drGrace from "@/assets/dr-grace.png";
import healingHandsImage from "@/assets/maingrace-logo.webp";
import consultationImage from "@/assets/branded-herbal-shelf.png";
import aboutHero from "@/assets/about-hero.png";
import VideoSection from "@/components/VideoSection";
import MeetOurStaff from "@/components/MeetOurStaff";
import FAQSection from "@/components/FAQSection";

const benefits = [
  "100% natural ingredients sourced ethically",
  "Personalized treatment plans",
  "No harmful side effects",
  "Centuries of proven healing wisdom",
  "Holistic approach to wellness",
  "Expert certified practitioners",
];

const coreValues = [
  {
    title: "Integrity",
    description: "We maintain honesty and transparency in all our dealings, ensuring patients receive genuine care and authentic remedies.",
  },
  {
    title: "Compassion",
    description: "We treat every patient with empathy and understanding, recognizing their unique health journey and needs.",
  },
  {
    title: "Excellence",
    description: "We strive for the highest standards in herbal preparation, patient care, and continuous improvement.",
  },
  {
    title: "Tradition",
    description: "We honor and preserve the ancient wisdom of traditional medicine while embracing beneficial modern practices.",
  },
  {
    title: "Community",
    description: "We build lasting relationships with our patients, their families, and the broader community we serve.",
  },
  {
    title: "Education",
    description: "We empower patients with knowledge about natural healing to make informed health decisions.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section - Content Overlay (Aligned with Services Pattern) */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden border-b-8 border-primary">
        <img
          src={aboutHero}
          alt="About Maingrace Tradomedical"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-block text-primary font-bold text-sm tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-top duration-700">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
              Rooted in Tradition, <br />
              <span className="text-primary italic">Driven by Excellence</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-300">
              For over 15 years, MAINGRACE GLOBAL LIMITED has been at the forefront of 
              natural healing, helping thousands discover the transformative power of traditional medicine.
            </p>
          </div>
        </div>
      </section>

      <VideoSection 
        reversed
        subtitle="Botanical Mastery"
        title="Witness the Power of Nature"
        videoUrl="https://www.youtube.com/embed/iUtnZpzkbG8"
        description="Explore the meticulous journey from soil to bottle. Our traditional preparation methods ensure the highest potency and purity for every patient's recovery."
      />

      {/* Founder Section */}
      <section className="py-20 lg:py-32 bg-muted relative overflow-hidden border-y-2 border-border">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative border-8 border-white shadow-elevated">
                <img
                  src={drGrace}
                  alt="Dr. (Mrs) Folashade Adetifa Dawodu - Founder"
                  className="relative w-full h-auto max-w-md mx-auto"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-accent p-6 shadow-elevated text-primary-foreground border-4 border-white">
                <div className="text-center">
                  <span className="block text-4xl font-serif font-bold">15+</span>
                  <span className="text-sm font-bold uppercase tracking-widest">Years of Excellence</span>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="space-y-8">
              <div className="bg-white p-8 md:p-12 border-l-8 border-primary shadow-card">
                <span className="inline-block text-primary font-bold text-sm tracking-wider uppercase mb-4">
                  Meet Our Founder
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Dr. (Mrs) Folashade Adetifa Dawodu
                </h2>
                <p className="text-lg text-accent font-bold mb-6 italic">
                  Tradomedical Doctor & Founder, MAINGRACE GLOBAL LIMITED
                </p>
                <div className="space-y-6 text-muted-foreground leading-relaxed font-medium">
                  <p>
                    With over 15 years of dedicated practice in traditional medicine, Dr. Dawodu has 
                    helped thousands of patients achieve optimal health through natural healing methods. 
                    Her passion for preserving ancestral healing wisdom while making it accessible to 
                    modern generations has been the driving force behind MAINGRACE GLOBAL LIMITED.
                  </p>
                  <p>
                    She believes that for every human illness, there exists a plant which is the cure. 
                    This philosophy guides every treatment and remedy prepared at our facility, ensuring 
                    that patients receive care that is both effective and aligned with nature's healing principles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Integrated */}
      <MeetOurStaff />

      {/* Vision, Mission, Core Values */}
      <section className="py-20 lg:py-32 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="rounded-none bg-white border-none shadow-elevated overflow-hidden relative">
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                  To be the leading provider of traditional medicine in Africa and beyond, recognized 
                  for our commitment to natural healing, patient care, and the preservation of ancestral 
                  healing knowledge for future generations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="rounded-none bg-white border-none shadow-elevated overflow-hidden relative">
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center mb-8">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                  To provide accessible, affordable, and effective natural healthcare solutions that 
                  promote holistic wellness. We are committed to treating the root cause of illness, 
                  not just symptoms, using time-tested herbal remedies with no harmful side effects.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Core Values */}
          <div className="text-center max-w-3xl mx-auto mb-16 px-4 py-8 bg-white border-b-8 border-primary">
            <span className="inline-block text-primary font-bold text-sm tracking-wider uppercase mb-4">
              Our Core Values
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              What Drives <span className="text-accent italic">Our Practice</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={value.title} className="rounded-none group hover:bg-white transition-all bg-white border-none shadow-card">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-accent flex items-center justify-center text-white font-bold text-xl">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground font-medium">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-none overflow-hidden shadow-elevated border-8 border-muted">
                <img
                  src={healingHandsImage}
                  alt="Healing hands holding medicinal herbs"
                  className="w-full h-auto object-cover aspect-square"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="bg-muted p-8 md:p-12 border-r-8 border-primary">
                <span className="inline-block text-primary font-bold text-sm tracking-wider uppercase mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                  Rooted in Tradition, <span className="text-primary italic">Healing for Today</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  At MAINGRACE GLOBAL LIMITED, we believe in the profound healing power of nature. Our practice 
                  combines ancestral wisdom with modern understanding to provide you with safe, 
                  effective, and personalized natural health solutions.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground font-bold">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-20 lg:py-32 bg-muted relative overflow-hidden border-t-8 border-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 bg-white p-8 md:p-12 shadow-card border-l-8 border-accent">
              <div className="space-y-4">
                <span className="inline-block text-primary font-bold text-sm tracking-wider uppercase">
                  Our Facility
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
                  A Sanctuary for <br />
                  <span className="text-accent italic">Natural Healing</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Our center is designed to provide a calming environment where healing begins 
                  the moment you step through our doors. We maintain a comprehensive collection 
                  of medicinal herbs and modern preparation facilities.
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-border">
                <p className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold">Olowotedo/Oran Expressway, Lagos, Nigeria</span>
                </p>
                <p className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold">07013376463, 07068509060</span>
                </p>
                <p className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold uppercase tracking-tighter">Mon - Sat: 8:30am - 8:00pm</span>
                </p>
              </div>
              <Button variant="hero" size="xl" className="group rounded-none bg-accent w-full sm:w-auto" asChild>
                <Link to="/consultation">
                  Visit Our Center
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="relative border-8 border-white shadow-elevated">
              <img
                src={consultationImage}
                alt="Our traditional medicine facility"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </Layout>
  );
};

export default About;
