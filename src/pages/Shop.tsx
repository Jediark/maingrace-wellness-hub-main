import { useState } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products as staticProducts, categories, productImages } from "@/data/products";
import { useProducts } from "@/hooks/useSupabase";
import { Star, Check, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import productsDisplay from "@/assets/products-display.webp";

const Shop = () => {
  const getFallbackImage = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("tonic") || n.includes("immune") || n.includes("digestive")) return productImages.herbalTonic;
    if (n.includes("men's") || n.includes("prostate") || n.includes("reproductive")) return productImages.mensHealth;
    if (n.includes("std") || n.includes("pack")) return productImages.stdTreatment;
    if (n.includes("liver") || n.includes("kidney") || n.includes("goldlife") || n.includes("detox")) return productImages.liverKidney;
    if (n.includes("women's") || n.includes("fibroid") || n.includes("endometriosis")) return productImages.womensHealth;
    return productImages.herbalTonic;
  };

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: dbProducts, isLoading, error } = useProducts();

  const products = dbProducts || staticProducts;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleGetQuote = (productName: string) => {
    const message = encodeURIComponent(`Hello MAINGRACE GLOBAL LIMITED, I'm interested in getting a quote for: ${productName}. Please provide more details.`);
    window.open(`https://wa.me/2347013376463?text=${message}`, "_blank");
  };

  // Center active category on mobile
  const scrollActiveIntoView = (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
    setSelectedCategory(category);
    const target = e.currentTarget;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  if (isLoading && !dbProducts) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center bg-muted">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - Content Overlay (Aligned with Services Pattern) */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden border-b-8 border-primary">
        <img
          src={productsDisplay}
          alt="Maingrace herbal products display"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-block text-primary font-bold text-sm tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-top duration-700">
              Our Catalog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
              Precision Botanical <br />
              <span className="text-primary italic">Healing Solutions</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-300">
              Browse our curated collection of natural herbal remedies. 
              Each formula is hand-crafted with ancestral wisdom for clinical efficacy.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-32 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-4 mb-12 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center gap-4 no-scrollbar scroll-smooth">
            {categories.map((category) => (
              <button
                key={category}
                onClick={(e) => scrollActiveIntoView(e, category)}
                className={`flex-shrink-0 px-8 py-3 rounded-none text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary shadow-elevated"
                    : "bg-white text-foreground border-border hover:border-primary hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="rounded-none bg-white border-none shadow-card group h-full flex flex-col hover:border-r-8 hover:border-primary transition-all">
                <CardHeader className="relative p-6">
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 z-10 px-4 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest shadow-card">
                      Bestseller
                    </div>
                  )}
                  <div className="w-full h-56 bg-muted flex items-center justify-center overflow-hidden mb-6 border-b-4 border-primary">
                    <img
                      src={product.image || getFallbackImage(product.name)}
                      alt={product.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getFallbackImage(product.name);
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  <CardTitle className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-6 pt-0">
                  <CardDescription className="text-muted-foreground font-medium line-clamp-2 mb-6">
                    {product.description}
                  </CardDescription>
                  <ul className="space-y-3 mb-8">
                    {product.features.slice(0, 2).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-xs font-bold text-foreground uppercase tracking-tight"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 border-t border-border">
                    <Button
                      size="xl"
                      variant="hero"
                      onClick={() => handleGetQuote(product.name)}
                      className="w-full gap-3 bg-accent border-4 border-white shadow-elevated group-hover:bg-primary transition-colors"
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

      <FAQSection />
      {/* Trust Section - Solid Design */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-serif font-bold italic">100%</div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Natural Ingredients</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-serif font-bold italic">15+</div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Years Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-serif font-bold italic">5000+</div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Satisfied Patients</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-serif font-bold italic">24/7</div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Clinical Support</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
