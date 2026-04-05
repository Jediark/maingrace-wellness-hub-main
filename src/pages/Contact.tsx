import { useState } from "react";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitInquiry } from "@/hooks/useSupabase";
import aboutHero from "@/assets/about-hero.png";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["07013376463", "07068509060"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@maingraceglobal.com", "support@maingraceglobal.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Olowotedo/Oran Expressway", "Lagos, Nigeria"],
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon - Sat: 8:30 AM - 8:00 PM", "Sunday: Closed"],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const mutation = useSubmitInquiry();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await mutation.mutateAsync(formData);

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly on WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="Contact MAINGRACE GLOBAL"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-background">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-background/90 leading-relaxed">
              Have questions about our services or products? We're here to help. 
              Reach out to MAINGRACE GLOBAL LIMITED through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <Card key={info.title} variant="bento" className="text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-3">{info.title}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 lg:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card variant="elevated" className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-2">
                Send Us a <span className="gradient-text">Message</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <Card variant="bento" className="overflow-hidden">
                <div className="w-full h-72 relative">
                  <iframe
                    title="Maingrace247 Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2953742668824!2d3.3966!3d6.6353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228afc9b3c1%3A0x1d4f6a7c1c6f1b2d!2sOlowotedo%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1711234567890!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-4 border-t border-border">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Olowotedo/Oran Expressway, Lagos, Nigeria</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Olowotedo+Oran+Expressway+Lagos+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-sm font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Get Directions
                  </a>
                </div>
              </Card>

              {/* Quick Contact Options */}
              <Card className="p-6 bg-card border border-border">
                <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Quick Contact Options
                </h3>
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/2347013376463" 
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Chat with us instantly</p>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+2347013376463" 
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-sm text-muted-foreground">Mon-Sat, 8:30AM-8PM</p>
                    </div>
                  </a>
                </div>
              </Card>

              {/* Social Links */}
              <Card variant="bento" className="p-6">
                <h3 className="font-serif font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <WhatsAppButton />
    </Layout>
  );
};

export default Contact;
