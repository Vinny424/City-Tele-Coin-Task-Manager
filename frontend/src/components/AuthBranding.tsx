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
    <div>
      {logoSrc && (
        <img
          className="mx-auto h-24 w-auto" // A larger logo for better visual impact
          src={logoSrc}
          alt="Application Logo"
          // Basic error handling in case the logo fails to load
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthBranding;
