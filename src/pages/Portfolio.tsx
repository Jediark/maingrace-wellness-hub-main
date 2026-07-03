import { useState } from "react";
import Layout from "@/components/Layout";
import { usePortfolioVideos } from "@/hooks/useSupabase";
import { Loader2, Play, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-healing.png";

const Portfolio = () => {
  useSEO({
    title: "Our Work in Action | Video Gallery",
    description: "Watch our tradomedical practitioners prepare natural remedies, detail treatments, and showcase botanical healing.",
    keywords: "herbal clinic videos, traditional remedies presentation, watch healing work, botanical therapy lagos"
  });

  const { data: videos, isLoading } = usePortfolioVideos();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Static fallback videos if database has none seeded
  const fallbackVideos = [
    {
      id: "fallback-1",
      title: "Introduction to Holistic Traditional Healing",
      description: "Dr. Folashade explains the foundations of traditional African herbal medicine and our clinical approach.",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: "fallback-2",
      title: "Preparing Our Signature Immunity Boost Tonic",
      description: "A look into how we source and brew natural roots and leaves for broad-spectrum wellness.",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    }
  ];

  const activeVideosList = (videos && videos.length > 0) ? videos : fallbackVideos;

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b-8 border-primary">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Work in Action banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">
              Visual Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 text-white text-center leading-tight">
              Our Work <br />
              <span className="text-primary italic">In Action</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center font-medium leading-relaxed">
              Explore how we harness nature's raw botanical power. Watch real-time preparations, 
              wellness guidelines, and clinical therapies in our video archive.
            </p>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {activeVideosList.map((video) => {
                const isYouTube = video.video_url.includes("youtube.com") || video.video_url.includes("youtu.be");
                
                return (
                  <div 
                    key={video.id} 
                    className="bg-card border-2 border-border shadow-card hover:border-primary transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-black flex items-center justify-center border-b border-border overflow-hidden group">
                      {isYouTube ? (
                        <iframe
                          src={
                            video.video_url.includes("watch?v=")
                              ? video.video_url.replace("watch?v=", "embed/").split("&")[0]
                              : video.video_url.includes("youtu.be/")
                              ? `https://www.youtube.com/embed/${video.video_url.split("youtu.be/")[1].split("?")[0]}`
                              : video.video_url
                          }
                          className="w-full h-full border-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video.title}
                        />
                      ) : (
                        <video
                          src={video.video_url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <h3 className="text-2xl font-serif font-bold text-foreground">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-muted-foreground font-medium text-sm leading-relaxed line-clamp-3">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Consultation CTA */}
          <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-primary to-accent text-primary-foreground border-t-8 border-white shadow-soft flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-3xl font-serif font-bold">Ready to Start Your Custom Healing Plan?</h3>
              <p className="opacity-90 max-w-2xl font-medium">Book a personalized, private session with Dr. Folashade to address your symptoms with certified herbal therapies.</p>
            </div>
            <Button variant="secondary" size="xl" className="rounded-none bg-white text-primary border-none shadow-card shrink-0 hover:bg-muted font-bold" asChild>
              <Link to="/consultation">
                Schedule Now
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
