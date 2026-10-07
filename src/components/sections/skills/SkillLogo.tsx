import { useState } from "react";
import { Wrench } from "lucide-react";

interface Props {
  logo?: string;
  icon?: React.ComponentType<{ size?: string | number; className?: string }>;
  size?: number;
  className?: string;
}

export default function SkillLogo({ logo, icon: Icon, size = 16, className = "" }: Props) {
  const [imgError, setImgError] = useState(false);

  // If a valid image path is provided
  if (logo && !imgError) {
    return (
      <img
        src={logo}
        alt=""
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className={`shrink-0 object-contain ${className}`}
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
      />
    );
  }

  // If a Lucide Icon component is provided instead
  if (Icon) {
    return <Icon size={size} className={`shrink-0 ${className}`} />;
  }

  // Ultimate fallback if nothing works
  return <Wrench size={size} className={`shrink-0 ${className}`} />;
}
