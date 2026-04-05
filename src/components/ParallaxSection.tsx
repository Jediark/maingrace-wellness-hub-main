import { ReactNode } from "react";

interface ParallaxSectionProps {
  image: string;
  height?: string;
}

const ParallaxSection = ({ 
  image, 
  height = "h-[300px] md:h-[500px]"
}: ParallaxSectionProps) => {
  return (
    <div 
      className={`relative ${height} overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover border-y-8 border-primary`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Shadow Overlay (Solid, minimal) */}
      <div className="absolute inset-x-0 top-0 h-2 bg-black opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-black opacity-20" />
    </div>
  );
};

export default ParallaxSection;
