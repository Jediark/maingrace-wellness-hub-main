import React, { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWellnessPopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWellnessPopup", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for email submission would go here
    console.log("Subscribing email:", email);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-md bg-card border-4 border-primary shadow-glow overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8 md:p-10 space-y-6 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-2 border-primary animate-pulse-gentle">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Welcome to <span className="text-primary italic">Natural Wellness</span>
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              We are Maingrace247 tradomedical herbal service. Your number 1 plug for natural wellness... How can we be of service?
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none border-2 border-border focus:border-primary h-12 bg-background font-bold text-center"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full h-12 rounded-none font-bold text-lg shadow-elevated group"
            >
              Subscribe for Wellness
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </form>
          
          <button 
            onClick={handleClose}
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all underline decoration-2 underline-offset-4"
          >
            No thanks, just browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopUp;
