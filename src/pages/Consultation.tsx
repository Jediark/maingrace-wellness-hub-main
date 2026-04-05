import { useState } from "react";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Phone, Mail, Check, Stethoscope, Video, Home, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitConsultation } from "@/hooks/useSupabase";
import healingHandsImage from "@/assets/healing-hands.webp";

const consultationTypes = [
  {
    icon: Stethoscope,
    title: "In-Person Consultation",
    description: "Visit our center for a comprehensive face-to-face health assessment.",
    duration: "60 minutes",
    price: "₦15,000",
  },
  {
    icon: Video,
    title: "Virtual Consultation",
    description: "Connect with our herbalist from the comfort of your home via video call.",
    duration: "45 minutes",
    price: "₦10,000",
  },
  {
    icon: Home,
    title: "Home Visit",
    description: "Our practitioner visits your home for personalized care (Lagos only).",
    duration: "90 minutes",
    price: "₦35,000",
  },
];

const Consultation = () => {
  const { toast } = useToast();
  const mutation = useSubmitConsultation();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [submittedType, setSubmittedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    concerns: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedType) {
      toast({
        title: "Please select a consultation type",
        description: "Choose your preferred consultation method before booking.",
        variant: "destructive",
      });
      return;
    }

    try {
      await mutation.mutateAsync({
        ...formData,
        type: selectedType,
      });

      toast({
        title: "Consultation Request Received!",
        description: "We will contact you within 24 hours to confirm your appointment.",
      });

      // Store submitted data for WhatsApp redirect
      setSubmittedData({ ...formData });
      setSubmittedType(selectedType);
      setSubmitted(true);

      // Reset form
      setFormData({ name: "", email: "", phone: "", date: "", time: "", concerns: "" });
      setSelectedType(null);
    } catch (error) {
      toast({
        title: "Error submitting request",
        description: "Please try again later or contact us directly on WhatsApp.",
        variant: "destructive",
      });
    }
  };

  const buildWhatsAppLink = () => {
    const message = [
      `Hello MAINGRACE GLOBAL LIMITED, I would like to book a consultation.`,
      ``,
      `*Name:* ${submittedData?.name}`,
      `*Phone:* ${submittedData?.phone}`,
      `*Email:* ${submittedData?.email}`,
      `*Consultation Type:* ${submittedType}`,
      `*Preferred Date:* ${submittedData?.date}`,
      `*Preferred Time:* ${submittedData?.time}`,
      submittedData?.concerns ? `*Health Concerns:* ${submittedData.concerns}` : "",
    ].filter(Boolean).join("\n");
    return `https://wa.me/2347013376463?text=${encodeURIComponent(message)}`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={healingHandsImage}
            alt="Book a consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
              Book Consultation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-background">
              Start Your Healing <span className="text-primary">Journey Today</span>
            </h1>
            <p className="text-lg text-background/90 leading-relaxed">
              Schedule a personalized consultation with our experienced MAINGRACE GLOBAL LIMITED practitioners 
              and discover the natural path to optimal health.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">
            Choose Your <span className="gradient-text">Consultation Type</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {consultationTypes.map((type) => (
              <Card 
                key={type.title}
                variant={selectedType === type.title ? "feature" : "bento"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedType === type.title ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedType(type.title)}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    selectedType === type.title 
                      ? "bg-gradient-to-br from-primary to-accent shadow-glow" 
                      : "bg-primary/10"
                  }`}>
                    <type.icon className={`w-7 h-7 ${
                      selectedType === type.title ? "text-primary-foreground" : "text-primary"
                    }`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    {selectedType === type.title && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{type.description}</CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {type.duration}
                    </span>
                    <span className="font-bold text-primary">{type.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">

            {/* Success State */}
            {submitted ? (
              <Card variant="elevated" className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">
                  Booking <span className="gradient-text">Confirmed!</span>
                </h3>
                <p className="text-muted-foreground mb-2">
                  Thank you, <strong>{submittedData?.name}</strong>! Your consultation request has been received.
                </p>
                <p className="text-muted-foreground mb-8">
                  We'll contact you within 24 hours. For faster response, continue on WhatsApp with your booking details pre-filled.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Continue on WhatsApp
                  </a>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => { setSubmitted(false); setSubmittedData(null); }}
                  >
                    Book Another
                  </Button>
                </div>
              </Card>
            ) : (
              <Card variant="elevated" className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-center mb-8">
                    Book Your <span className="gradient-text">Appointment</span>
                  </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Preferred Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="concerns">Health Concerns (Optional)</Label>
                  <Textarea
                    id="concerns"
                    value={formData.concerns}
                    onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                    placeholder="Briefly describe your health concerns or what you'd like to discuss..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Book Consultation
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By booking, you agree to our terms of service and privacy policy.
                </p>
              </form>
            </Card>
            )}
          </div>
        </div>
      </section>
      <FAQSection />
      <WhatsAppButton />
    </Layout>
  );
};

export default Consultation;
