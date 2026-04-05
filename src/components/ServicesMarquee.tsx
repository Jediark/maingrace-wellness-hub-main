import { Link } from "react-router-dom";

const services = [
  { name: "Health Consultation" },
  { name: "Herbal Remedies" },
  { name: "Fertility Support" },
  { name: "Chronic Care" },
  { name: "Pain Management" },
  { name: "Mental Wellness" },
  { name: "Women's Health" },
  { name: "Men's Health" },
  { name: "Detox Programs" },
];

const ServicesMarquee = () => {
  return (
    <section className="py-16 bg-accent overflow-hidden border-y-4 border-white shadow-elevated">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <span className="inline-block text-white font-bold text-sm tracking-wider uppercase mb-2">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white uppercase">
            Our Services
          </h2>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...services, ...services].map((service, index) => (
            <Link
              key={index}
              to="/services"
              className="inline-flex items-center gap-3 mx-4 px-8 py-4 bg-white border-2 border-primary text-foreground hover:bg-secondary hover:text-white transition-colors group shadow-card"
            >
              <span className="w-2 h-2 bg-primary" />
              <span className="font-bold text-lg">{service.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Second row - reverse direction */}
      <div className="relative mt-4">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...services].reverse().concat([...services].reverse()).map((service, index) => (
            <Link
              key={index}
              to="/services"
              className="inline-flex items-center gap-3 mx-4 px-8 py-4 bg-white border-2 border-accent text-foreground hover:bg-primary hover:text-white transition-colors group shadow-card"
            >
              <span className="w-2 h-2 bg-accent" />
              <span className="font-bold text-lg">{service.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesMarquee;
