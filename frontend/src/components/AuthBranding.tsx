import React from 'react';

interface AuthBrandingProps {
  logoSrc: string;
  title: string;
  subtitle: React.ReactNode;
}
//// This component is used to display branding
//  information on authentication pages like login and registration.
////
const AuthBranding: React.FC<AuthBrandingProps> = ({ logoSrc, title, subtitle }) => {
  return (
    <div className="text-center">
      {logoSrc && (
        <div className="flex justify-center mb-6">
          <img
            className="w-auto max-w-full object-contain transition-all duration-300"
            src={logoSrc}
            alt="Application Logo"
            style={{
              height: 'clamp(120px, 15vw, 150px)', // Responsive between 120px and 150px
              maxHeight: '25vh', // Never exceed 25% of viewport height
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
        {title}
      </h2>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthBranding;
