import React from 'react';

interface LogoProps {
  /** Base filename for the logo (without extension) */
  logoName?: string;
  /** File extension for the logo */
  extension?: string;
  /** Size variant for the logo */
  size?: 'small' | 'medium' | 'large' | string;
  /** Color variant for dark/light themes */
  variant?: 'light' | 'dark' | string;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Custom size classes for non-standard sizes */
  customSizeClass?: string;
  /** Fallback icon configuration */
  fallback?: {
    bgColor?: string;
    iconColor?: string;
    shape?: 'rounded-lg' | 'rounded-full' | 'rounded-none' | string;
    icon?: React.ReactNode;
  };
  /** Custom path prefix (if not in public root) */
  pathPrefix?: string;
  /** Dark variant suffix (default: '-dark') */
  darkSuffix?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  logoName = 'logo',
  extension = 'png',
  size = 'medium', 
  variant = 'light',
  className = '',
  alt = 'Logo',
  customSizeClass,
  fallback = {},
  pathPrefix = '',
  darkSuffix = '-dark'
}) => {
  // Default size classes - can be overridden with customSizeClass
  const defaultSizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };

  // Fallback configuration with defaults
  const {
    bgColor = 'bg-blue-600',
    iconColor = 'text-white',
    shape = 'rounded-lg',
    icon
  } = fallback;

  // Determine size class
  const getSizeClass = () => {
    if (customSizeClass) return customSizeClass;
    if (typeof size === 'string' && defaultSizeClasses[size as keyof typeof defaultSizeClasses]) {
      return defaultSizeClasses[size as keyof typeof defaultSizeClasses];
    }
    return size; // Return as-is if it's a custom string like 'h-20'
  };

  // Build logo path based on variant and provided name
  const getLogoSrc = () => {
    const basePath = pathPrefix ? `/${pathPrefix}` : '';
    
    if (variant === 'dark') {
      return `${basePath}/${logoName}${darkSuffix}.${extension}`;
    }
    return `${basePath}/${logoName}.${extension}`;
  };

  const logoSrc = getLogoSrc();
  const sizeClass = getSizeClass();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    
    // If dark variant fails, try light variant
    if (variant === 'dark' && target.src.includes(darkSuffix)) {
      const basePath = pathPrefix ? `/${pathPrefix}` : '';
      target.src = `${basePath}/${logoName}.${extension}`;
      return;
    }

    // Create fallback icon
    const iconSize = sizeClass;
    
    // Calculate inner icon size based on outer size
    const getInnerIconSize = () => {
      if (sizeClass.includes('h-8')) return 'h-4 w-4';
      if (sizeClass.includes('h-16')) return 'h-8 w-8';
      if (sizeClass.includes('h-20')) return 'h-10 w-10';
      return 'h-6 w-6'; // default medium
    };

    const iconInnerSize = getInnerIconSize();
    
    // Default icon if none provided
    const defaultIcon = `
      <svg class="${iconInnerSize} ${iconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    `;
    
    target.outerHTML = `
      <div class="${iconSize} w-auto ${bgColor} ${shape} flex items-center justify-center ${className}">
        ${icon ? icon.toString() : defaultIcon}
      </div>
    `;
  };

  return (
    <img
      className={`w-auto ${sizeClass} ${className}`}
      src={logoSrc}
      alt={alt}
      onError={handleImageError}
    />
  );
};

export default Logo;
