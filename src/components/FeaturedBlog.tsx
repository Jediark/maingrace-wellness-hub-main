import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.webp";

const FeaturedBlog = () => {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-muted relative overflow-hidden border-y-8 border-primary">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-4 border-primary pb-8">
          <div>
            <span className="inline-block text-accent font-bold text-sm tracking-[0.3em] uppercase border-l-4 border-accent pl-4 mb-4">
              Latest Insights
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground">
              Health & <span className="text-primary italic">Botanical Research</span>
            </h2>
          </div>
          <Button variant="outline" className="group self-start md:self-auto rounded-none border-4 border-primary font-bold uppercase tracking-widest bg-background dark:bg-card hover:bg-primary hover:text-white transition-all shadow-card" asChild>
            <Link to="/blog">
              Journal Archive
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`rounded-none border-none bg-card shadow-card flex flex-col group h-full ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <CardHeader className="p-0">
                <div className="relative h-64 overflow-hidden border-b-4 border-primary">
                  <img
                    src={post.image || heroBg}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest shadow-card">
                      {post.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-primary" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="text-2xl font-serif font-bold group-hover:text-primary transition-colors leading-[1.2]">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
                <div className="mt-auto pt-6 border-t border-border">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs group/link"
                  >
                    Read Full Study
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
