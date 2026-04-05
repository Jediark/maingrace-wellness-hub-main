import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import { useBlogPosts } from "@/hooks/useSupabase";
import { useState } from "react";
import { ArrowRight, Calendar, Clock, Search, Loader2 } from "lucide-react";
import blogHero from "@/assets/blog-hero.png";
import advertFlyer from "@/assets/advert-flyer.jpeg";

const categories = [
  "All Posts",
  "Traditional Medicine",
  "Wellness Tips",
  "Chronic Care",
  "Sleep Health",
  "Fertility",
  "Mental Wellness",
  "Natural Remedies",
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: dbPosts, isLoading } = useBlogPosts();

  const blogPosts = dbPosts || staticPosts;

  const featuredPost = blogPosts.find(post => post.featured);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory =
      activeCategory === "All Posts" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show featured post separately only when on "All Posts" with no search
  const showFeatured = activeCategory === "All Posts" && searchQuery === "";
  const displayedPosts = showFeatured
    ? filteredPosts.filter(post => !post.featured || (featuredPost && post.id !== featuredPost.id))
    : filteredPosts;

  if (isLoading && !dbPosts) {
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
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blogHero}
            alt="Wellness Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl botanical-h1 mb-6 text-white text-center">
              Wellness Insights & <span className="text-primary italic">Health Education</span>
            </h1>
            <p className="text-lg md:text-xl botanical-text text-white/90 text-center">
              Explore our collection of articles on traditional medicine, natural healing, 
              and holistic wellness practices.
            </p>
            {/* Search bar in hero */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/60" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-background/15 border border-background/30 text-background placeholder:text-background/60 focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post - only when browsing all */}
      {showFeatured && featuredPost && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card variant="feature" className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl h-64 lg:h-auto flex items-center justify-center overflow-hidden">
                  {featuredPost.image ? (
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/20" />
                  )}
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      Featured
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {featuredPost.author}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                    <Button variant="hero" className="group" asChild>
                      <Link to={`/blog/${featuredPost.slug}`}>
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Main Content with Sidebar */}
      <section className="py-20 lg:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12">
                Latest <span className="gradient-text">Articles</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {displayedPosts.length > 0 ? (
                  displayedPosts.map((post) => (
                    <Card key={post.id} variant="elevated" className="group h-full">
                      <CardHeader>
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl h-48 flex items-center justify-center mb-4 overflow-hidden">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/20" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <Button variant="ghost" size="sm" className="group/btn" asChild>
                            <Link to={`/blog/${post.slug}`}>
                              Read
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-20">
                    <p className="text-5xl mb-4">🌿</p>
                    <h3 className="text-xl font-serif font-bold mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-6">Try a different category or search term.</p>
                    <Button
                      variant="outline"
                      onClick={() => { setActiveCategory("All Posts"); setSearchQuery(""); }}
                    >
                      View All Articles
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="text-lg font-serif font-bold mb-4">Categories</h3>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${
                        activeCategory === category
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Advertisement */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <div className="p-4 bg-primary/10">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    Advertisement
                  </span>
                </div>
                <div className="p-4">
                  <img 
                    src={advertFlyer} 
                    alt="Maingrace Services" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-serif font-bold mb-3">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get weekly health tips and updates delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                />
                <Button variant="hero" size="sm" className="w-full">
                  Subscribe
                </Button>
              </div>
              
              {/* Popular Posts */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="text-lg font-serif font-bold mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {post.date}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Stay Updated on <span className="gradient-text">Natural Wellness</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly health tips, new articles, and 
            exclusive offers on our herbal products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="hero" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
