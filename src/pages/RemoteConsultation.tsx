import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X, Camera, FileText, Shield, Clock, MapPin } from "lucide-react";
import drGrace from "@/assets/dr-grace.png";
import heroBg from "@/assets/hero-bg.webp";

const RemoteConsultation = () => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    symptoms: "",
    duration: "",
    medications: "",
    medicalHistory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success(
      "Your consultation request has been submitted! Our team will review your case and contact you within 24 hours."
    );
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      location: "",
      symptoms: "",
      duration: "",
      medications: "",
      medicalHistory: "",
    });
    setImages([]);
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Remote Consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
                Remote Consultation
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-background">
                Get Expert Care <span className="text-primary">From Anywhere</span>
              </h1>
              <p className="text-lg text-background/90 leading-relaxed mb-8">
                Can't visit us in person? No problem! Describe your symptoms, upload
                images of any visible conditions, and our herbalist will provide
                personalized recommendations tailored to your needs.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 bg-background/10 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-background">100% Confidential</h3>
                    <p className="text-xs text-background/70">Your data is secure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/10 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-background">24hr Response</h3>
                    <p className="text-xs text-background/70">Quick turnaround</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/10 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-background">Nationwide</h3>
                    <p className="text-xs text-background/70">We deliver everywhere</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={drGrace}
                  alt="Dr. Folashade Adetifa Dawodu"
                  className="w-full h-auto object-cover bg-gradient-to-br from-cream to-muted"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-elevated border border-border">
                <p className="font-serif font-bold text-lg">Dr. (Mrs) Folashade Adetifa Dawodu</p>
                <p className="text-sm text-muted-foreground">Founder & Chief Herbalist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Describe Your <span className="gradient-text">Health Concern</span>
              </h2>
              <p className="text-muted-foreground">
                Please fill in the form below with as much detail as possible. The
                more information you provide, the better we can help you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-card rounded-2xl p-6 shadow-soft space-y-6 border border-border">
                <h3 className="text-xl font-serif font-bold">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (City/State) *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Lagos, Nigeria"
                    />
                  </div>
                </div>
              </div>

              {/* Health Concern */}
              <div className="bg-card rounded-2xl p-6 shadow-soft space-y-6 border border-border">
                <h3 className="text-xl font-serif font-bold">Health Concern Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">
                      Describe Your Symptoms in Detail *
                    </Label>
                    <Textarea
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Please describe what you're experiencing. Include details like pain location, intensity, when it started, what makes it better or worse, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      How Long Have You Had This Condition? *
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 2 weeks, 3 months, 1 year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">
                      Current Medications (if any)
                    </Label>
                    <Textarea
                      id="medications"
                      name="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      rows={3}
                      placeholder="List any medications, supplements, or herbal remedies you're currently taking"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">
                      Relevant Medical History
                    </Label>
                    <Textarea
                      id="medicalHistory"
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any previous diagnoses, surgeries, allergies, or conditions we should know about"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-card rounded-2xl p-6 shadow-soft space-y-6 border border-border">
                <h3 className="text-xl font-serif font-bold">
                  Upload Images (Optional)
                </h3>
                <p className="text-sm text-muted-foreground">
                  If your condition has visible symptoms (skin issues, swelling, etc.),
                  please upload clear photos to help us assess your situation better.
                  Maximum 5 images.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden bg-muted"
                    >
                      <img
                        src={img.preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Camera className="w-6 h-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add Photo</span>
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Disclaimer */}
              <div className="bg-muted rounded-xl p-4 flex gap-3 border border-border">
                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> This remote consultation service is for
                  informational purposes and to help us prepare a treatment plan. It
                  does not replace in-person medical examination. For serious or
                  emergency conditions, please visit a healthcare facility immediately.
                </p>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RemoteConsultation;
