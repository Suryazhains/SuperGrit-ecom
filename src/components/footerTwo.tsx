// import React from 'react';
// // Make sure to use the blue version of your logo here since the background is now light
// import Logo from '../assets/whitelogo.png'; 

// const Footer: React.FC = () => {
//   return (
//     // Changed background to #F9FAFB and added the top border color from your Figma file
//     <footer className="bg-[#1f4c31] py-16 px-4 md:px-8 lg:px-20 w-full font-sans border-t border-[#E5E7EB]">
//       <div className="max-w-[1200px] mx-auto">
        
//         <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 pb-12">
          
//           {/* Brand & Description */}
//           <div className="max-w-md">
//             <img 
//               src={Logo} 
//               alt="Super Grit Logo" 
//               className="h-8 mb-6 object-contain" 
//             />
            
//             {/* Changed text from white to text-gray-600 */}
//             <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//               Empowering individuals to reduce<br className="hidden sm:block" />
//               smoking through habit control,<br className="hidden sm:block" />
//               mindfulness, and healthier alternatives.
//             </p>
//           </div>

//           {/* Links Section (Quick Links removed) */}
//           <div className="flex flex-row pr-0 lg:pr-10">
//             <div>
//               {/* Heading changed to text-gray-900 for high contrast */}
//               <h3 className="font-semibold text-base mb-5 text-gray-900">Connect</h3>
//               <ul className="space-y-4 text-sm sm:text-base text-gray-600">
//                 <li><a href="#support" className="hover:text-gray-900 transition-colors duration-200">Support</a></li>
//                 <li><a href="#privacy" className="hover:text-gray-900 transition-colors duration-200">Privacy Policy</a></li>
//                 <li><a href="#terms" className="hover:text-gray-900 transition-colors duration-200">Terms of Service</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Divider and Copyright */}
//         <div className="border-t border-[#E5E7EB] pt-8">
//           <p className="text-center text-sm text-gray-500">
//             © 2026 Super Grit. Supporting healthier habits and mindful choices.
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;