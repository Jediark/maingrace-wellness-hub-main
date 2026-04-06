import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/maingrace-logo-premium.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
  <img src={logo} alt="MAINGRACE GLOBAL" className="w-12 h-12 rounded-full object-cover shadow-card" />
  <div className="flex flex-col">
    <span className="text-xl font-serif font-bold text-background tracking-tight">MAINGRACE</span>
    <span className="text-[0.65rem] text-primary font-bold uppercase tracking-[0.2em] -mt-1">GLOBAL LIMITED</span>
  </div>
            </Link>
            <p className="text-background/70 leading-relaxed mb-6">
              Embracing the healing power of nature through traditional medicine and 
              holistic wellness practices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-background/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-background/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-background/70 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-background/70 hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {['Health Consultation', 'Herbal Remedies', 'Chronic Care', 'Natural Supplements', 'Wellness Education'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-background/70 hover:text-primary transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70 text-sm italic">Olowotedo/Ibadan ExpressWay, Ogun State Nigeria</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">07013376463, 07068509060</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">info@maingrace247.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm italic">
            © {currentYear} MAINGRACE GLOBAL LIMITED. All rights reserved. | Built by Trendtactics Digital
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-background/60 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-background/60 hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="text-background/60 hover:text-primary transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
