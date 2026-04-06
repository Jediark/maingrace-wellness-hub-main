import { Play, PlayCircle } from "lucide-react";
import { useState } from "react";

interface VideoSectionProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  description: string;
  posterImage?: string;
  reversed?: boolean;
}

const VideoSection = ({ title, subtitle, videoUrl, description, posterImage, reversed = false }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-y-8 border-primary">
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
          {/* Text Content */}
          <div className="flex-1 max-w-2xl text-left">
            <span className="inline-block text-accent font-bold text-sm tracking-[0.3em] uppercase border-l-4 border-accent pl-4 mb-6">
              {subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-8">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-10 border-l-2 border-border pl-6 italic">
              {description}
            </p>
            <div className="flex items-center gap-4 text-primary font-bold uppercase tracking-widest text-sm">
              <div className="w-12 h-1 bg-primary" />
              Watch Our Journey
            </div>
          </div>

          {/* Video Container (Minimized Clinical Card) */}
          <div className="flex-1 w-full max-w-xl aspect-video bg-muted border-8 border-primary shadow-elevated relative group overflow-hidden">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 z-20 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                {posterImage ? (
                  <img 
                    src={posterImage} 
                    alt="Clinical Process" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <PlayCircle className="w-20 h-20 text-primary" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-glow animate-pulse">
                    <Play className="w-10 h-10 fill-white" />
                  </div>
                </div>
                {/* Default Play Icon (Always visible) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:hidden">
                   <div className="w-16 h-16 bg-primary/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center border-4 border-white">
                    <Play className="w-8 h-8 fill-white" />
                  </div>
                </div>
              </div>
            ) : (
              videoUrl.endsWith('.mp4') ? (
                <video 
                  className="w-full h-full object-cover" 
                  controls 
                  autoPlay 
                  playsInline
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )
            )}
            
            {/* Visual Frame Decor */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-8 border-r-8 border-accent -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-8 border-l-8 border-accent -z-10" />
          </div>
        </div>
      </div>

      {/* Decorative Label */}
      <div className={`absolute top-1/2 ${reversed ? 'left-0' : 'right-0'} -translate-y-1/2 opacity-5 pointer-events-none hidden xl:block`}>
        <span className="text-[120px] font-serif font-bold text-primary whitespace-nowrap rotate-90 uppercase">
          Tradition
        </span>
      </div>
    </section>
  );
};

export default VideoSection;
