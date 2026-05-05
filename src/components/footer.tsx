import React from 'react';
// 1. Import your logo image here (update the path to where your image is saved)
import WhiteLogo from '../assets/whitelogo.png'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f4c31] text-white py-16 px-6 lg:px-20 w-full font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 pb-12">
          
          {/* Brand & Description */}
          <div className="max-w-md">
            
            {/* 2. Replaced the <h2> text with the <img> tag */}
            <img 
              src={WhiteLogo} 
              alt="Super Grit Logo" 
              className="h-20 md:h-24 mb-5 object-contain" // Increased logo size
            />
            
            {/* Text color changed to solid white */}
            <p className="text-white leading-relaxed text-base sm:text-lg">
              Empowering individuals to reduce<br className="hidden sm:block" />
              smoking through habit control,<br className="hidden sm:block" />
              mindfulness, and healthier alternatives.
            </p>
          </div>

          <div className="flex flex-row gap-16 md:gap-24 lg:gap-32 pr-0 lg:pr-10">
          
            <div>
              <h3 className="font-semibold text-lg mb-5 text-white">Connect</h3>
              {/* Text color changed to solid white */}
              <ul className="space-y-3.5 text-sm sm:text-base text-white">
                <li><a href="#support" className="hover:text-gray-200 transition-colors duration-200">Support</a></li>
                <li><a href="#privacy" className="hover:text-gray-200 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-gray-200 transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          {/* Text color changed to solid white */}
          <p className="text-center text-sm sm:text-base text-white">
            © 2026 Super Grit. Supporting healthier habits and mindful choices.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;