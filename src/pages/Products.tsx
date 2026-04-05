import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, ArrowRight, Check } from "lucide-react";

const categories = ["All", "Immunity", "Digestive", "Men's Health", "Women's Health", "Detox", "STD Treatment"];

const products = [
  {
    id: 1,
    name: "Herbal Tonic Immune Booster",
    category: "Immunity",
    rating: 4.8,
    reviews: 124,
    description: "A powerful blend of ancient roots and leaves designed to strengthen your immune system naturally.",
    bestseller: true,
  },
  {
    id: 2,
    name: "Men's Health Treatment Pack",
    category: "Men's Health",
    rating: 4.9,
    reviews: 89,
    description: "Complete herbal treatment for men's reproductive health and performance enhancement.",
    bestseller: true,
  },
  {
    id: 3,
    name: "STD Complete Treatment Pack",
    category: "STD Treatment",
    rating: 4.7,
    reviews: 156,
    description: "Comprehensive herbal treatment package for broad-spectrum infection clearance.",
    bestseller: false,
  },
  {
    id: 4,
    name: "Goldlife Liver & Kidney Supplement",
    category: "Detox",
    rating: 4.6,
    reviews: 78,
    description: "Multi-cure dietary supplement focusing on liver detoxification and kidney support.",
    bestseller: false,
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleGetQuote = (productName: string) => {
    const message = encodeURIComponent(`Hello Maingrace247, I'm interested in getting a quote for: ${productName}.`);
    window.open(`https://wa.me/2347013376463?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero Section - Solid Design */}
      <section className="py-24 lg:py-32 bg-white border-b-8 border-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-accent font-bold text-sm tracking-[0.3em] uppercase border-l-4 border-accent pl-4 mb-4">
              Featured Remedies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-8">
              Natural Potency <br />
              <span className="text-primary italic">Ancestral Wisdom</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
              Discover our signature collections of therapeutic grade herbal solutions. 
              Pure, additive-free, and clinically observed for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-32 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-none text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary shadow-elevated"
                    : "bg-white text-foreground border-border hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="rounded-none bg-white border-none shadow-card h-full flex flex-col group">
                <CardHeader className="p-6 relative">
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-card">
                      Bestseller
                    </div>
                  )}
                  <div className="w-full h-48 bg-muted flex items-center justify-center mb-6 border-b-4 border-primary">
                    <Star className="w-12 h-12 text-primary opacity-20" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  <CardTitle className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-6 pt-0">
                  <CardDescription className="text-muted-foreground font-medium text-sm line-clamp-3 mb-6">
                    {product.description}
                  </CardDescription>
                  <div className="mt-auto pt-6 border-t border-border">
                    <Button 
                      size="lg" 
                      variant="hero" 
                      className="w-full gap-3 bg-accent border-4 border-white shadow-elevated"
                      onClick={() => handleGetQuote(product.name)}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Get a Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Solid Design */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Specialized <span className="text-accent italic">Consultation</span>
          </h2>
          <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto">
            Not sure which products are right for your specific condition? Book a private session 
            to receive a tailored botanical protocol.
          </p>
          <Button variant="hero" size="xl" className="group bg-white text-primary border-4 border-accent shadow-elevated hover:bg-accent hover:text-white" asChild>
            <Link to="/consultation">
              Request Protocol
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
