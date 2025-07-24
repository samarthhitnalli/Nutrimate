// import React from 'react';
// import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

// const Footer = () => {
//   const developers = [
//     {
//       name: "Samarth Hitnalli",
//       github: "https://github.com/BrutalSam01",
//       linkedin: "https://www.linkedin.com/in/samarthhitnalli/",
//       email: "hitnallisamarth@gmail.com"
//     }
//   ];

//   return (
//     <footer className="bg-black text-gray-400">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
//           {/* About Section */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
//             <p className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
//               We believe in making cooking accessible, enjoyable, and creative for everyone through 
//               the power of AI and community.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {[
//                 { name: 'Home', path: '/' },
//                 { name: 'About', path: '/about' },
//                 { name: 'Search Recipes', path: '/form' },
//                 { name: 'Contact', path: '/contact' }
//               ].map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.path}
//                     className="hover:text-white transition-colors duration-200 block transform hover:translate-x-1"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Features */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Features</h3>
//             <ul className="space-y-2">
//               <li className="hover:text-white transition-colors duration-200">AI-Powered Search</li>
//               <li className="hover:text-white transition-colors duration-200">Image Recognition</li>
//               <li className="hover:text-white transition-colors duration-200">Personalized Experience</li>
//               <li className="hover:text-white transition-colors duration-200">Recipe Collections</li>
//             </ul>
//           </div>

//           {/* Developers */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Our Developers</h3>
//             <div className="space-y-4">
//               {developers.map((dev) => (
//                 <div key={dev.name} className="space-y-2">
//                   <p className="text-white">{dev.name}</p>
//                   <div className="flex gap-3">
//                     <a
//                       href={dev.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-white transition-colors duration-200"
//                     >
//                       <Github className="w-5 h-5" />
//                     </a>
//                     <a
//                       href={dev.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-white transition-colors duration-200"
//                     >
//                       <Linkedin className="w-5 h-5" />
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 flex-shrink-0" />
//                 <p>Vijayapura, Karnataka</p>
//               </div>
//               <div className="flex flex-nowrap items-center gap-2">
//                 <Mail className="w-5 h-5 flex-shrink-0" />
//                 <a 
//                   href="mailto:hitnallisamarth@gmail.com"
//                   className="hover:text-white transition-colors duration-200 break-all"
//                 >
//                   hitnallisamarth@gmail.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <p className="text-center text-sm">
//             © {new Date().getFullYear()} RecipeRover. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
'use client';
import React from 'react';
import { Github, Linkedin, Mail, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const developers = [
    {
      name: "Samarth Hitnalli",
      github: "https://github.com/BrutalSam01",
      linkedin: "https://www.linkedin.com/in/samarthhitnalli/",
      email: "hitnallisamarth@gmail.com",
    },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Search Recipes', path: '/form' },
    { name: 'Contact', path: '/contact' },
  ];

  const features = [
    'AI-Powered Search',
    'Image Recognition',
    'Personalized Experience',
    'Recipe Collections',
  ];

  return (
    <footer className="bg-black text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center mb-3">
            <span className="text-green-500 text-xl font-bold mr-1">Nutri</span>
            <span className="text-white text-xl font-bold">Mate</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-xs">
            Making cooking accessible, enjoyable, and creative for everyone through AI and community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            {quickLinks.map((link) => (
              <li key={link.name} className="flex items-center group">
                <ChevronRight className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition" />
                <Link
                  href={link.path}
                  className="ml-1 group-hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-white font-semibold mb-2">Features</h4>
          <ul className="space-y-1">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Developer */}
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Vijayapura, Karnataka</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-green-500 mt-0.5" />
              <a
                href="mailto:hitnallisamarth@gmail.com"
                className="break-all hover:text-white transition"
              >
                hitnallisamarth@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-800 pt-3">
            <p className="text-white font-medium mb-1 text-sm">Developer</p>
            {developers.map((dev) => (
              <div key={dev.name} className="flex justify-between items-center text-xs">
                <span>{dev.name}</span>
                <div className="flex gap-2">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-green-500"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-green-500"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-xs text-gray-600 py-3 border-t border-gray-800">
        © {new Date().getFullYear()} NutriMate.AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
