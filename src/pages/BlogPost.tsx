import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogPosts as staticPosts, blogCategories } from "@/data/blogPosts";
import { useBlogPost, useBlogPosts } from "@/hooks/useSupabase";
import { Calendar, User, Clock, ArrowLeft, MessageCircle, Share2, Facebook, Twitter, Loader2 } from "lucide-react";
import { toast } from "sonner";
import drGrace from "@/assets/dr-grace.png";
import heroBg from "@/assets/hero-bg.webp";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: dbPost, isLoading } = useBlogPost(slug || "");
  const { data: dbPosts } = useBlogPosts();
  
  const blogPosts = dbPosts || staticPosts;
  const post = dbPost || staticPosts.find((p) => p.slug === slug);
  
  const [comment, setComment] = useState({ name: "", email: "", message: "" });

  if (isLoading && !dbPost) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center bg-muted">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="py-20 lg:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-serif font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button variant="hero" asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Comment submitted! It will appear after moderation.");
    setComment({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                <span className="font-medium flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>
                <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 bg-muted/50 rounded-2xl flex flex-col sm:flex-row gap-6">
                <img
                  src={drGrace}
                  alt={post.author}
                  className="w-24 h-24 rounded-full object-cover bg-background"
                />
                <div>
                  <h3 className="text-lg font-serif font-bold">{post.author}</h3>
                  <p className="text-sm text-primary mb-2">{post.authorRole}</p>
                  <p className="text-muted-foreground text-sm">
                    With over 15 years of experience in tradomedical practice, Dr. Folashade
                    is dedicated to helping people achieve optimal health through natural
                    healing methods.
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Leave a Comment
                </h2>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name *"
                      value={comment.name}
                      onChange={(e) => setComment({ ...comment, name: e.target.value })}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your Email *"
                      value={comment.email}
                      onChange={(e) => setComment({ ...comment, email: e.target.value })}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Your comment..."
                    value={comment.message}
                    onChange={(e) => setComment({ ...comment, message: e.target.value })}
                    required
                    rows={5}
                  />
                  <Button type="submit" variant="hero">
                    Post Comment
                  </Button>
                </form>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-serif font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {blogCategories.slice(1).map((cat) => (
                    <li key={cat}>
                      <Link
                        to={`/blog?category=${cat}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                      >
                        <span>{cat}</span>
                        <span className="text-sm bg-muted px-2 py-0.5 rounded">
                          {blogPosts.filter((p) => p.category === cat).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advertisement */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground">
                <h3 className="text-lg font-serif font-bold mb-2">
                  Need a Consultation?
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Book a personalized session with our herbalist to address your
                  health concerns naturally.
                </p>
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/consultation">Book Now</Link>
                </Button>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h3 className="text-lg font-serif font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {related.date}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Shop CTA */}
              <div className="bg-muted rounded-2xl p-6">
                <h3 className="text-lg font-serif font-bold mb-2">
                  Shop Our Products
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover our range of natural herbal remedies and supplements.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/shop">Visit Shop</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
