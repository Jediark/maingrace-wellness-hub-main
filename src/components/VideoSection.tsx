import { Play } from "lucide-react";

interface VideoSectionProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  description: string;
  reversed?: boolean;
}

const VideoSection = ({ title, subtitle, videoUrl, description, reversed = false }: VideoSectionProps) => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-y-8 border-primary">
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

          {/* Video Container */}
          <div className="flex-1 w-full aspect-video bg-muted border-8 border-primary shadow-elevated relative group">
            {videoUrl.endsWith('.mp4') ? (
              <video 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                muted 
                loop
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
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
