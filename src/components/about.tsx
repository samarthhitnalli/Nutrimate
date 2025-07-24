/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// src\components\about.tsx
// import React from 'react';

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
//         {/* Hero Section with fade-in animation */}
//         <div className="text-center mb-16 animate-fade-in">
//           <h1 className="text-4xl md:text-5xl mt-16 font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             About Recipe
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto opacity-0 animate-slide-up">
//             Your intelligent culinary companion that transforms the way you discover and create amazing dishes
//           </p>
//         </div>

//         {/* Main Content Grid with stagger effect */}
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
//           <div className="space-y-6 order-2 md:order-1 opacity-0 animate-slide-in-left">
//             <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
//               Revolutionizing Recipe Discovery
//             </h2>
//             <p className="text-gray-300 leading-relaxed">
//               RecipeRover harnesses the power of advanced AI to understand your unique preferences, dietary requirements, and available ingredients. Whether you're searching by text, uploading an image of ingredients, or filling out a detailed form, we connect you with perfectly matched recipes from our vast collection.
//             </p>
//             <p className="text-gray-300 leading-relaxed">
//               Our intelligent recommendation system learns from your interactions, making each suggestion more personalized than the last. From quick weekday dinners to elaborate weekend feasts, RecipeRover is your trusted companion in the kitchen.
//             </p>
//           </div>
//           <div className="order-1 md:order-2 opacity-0 animate-slide-in-right">
//             <img 
//               src="/about1.png"
//               alt="Website Interface Illustration"
//               className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </div>

//         {/* Second Content Section */}
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="opacity-0 animate-slide-in-left">
//             <img 
//               src="/about2.png"
//               alt="Cooking Illustration"
//               className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//           <div className="space-y-6 opacity-0 animate-slide-in-right">
//             <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
//               Our Vision
//             </h2>
//             <p className="text-gray-300 leading-relaxed">
//               We believe that cooking should be an accessible, enjoyable, and creative experience for everyone. Our platform is designed to inspire confidence in the kitchen, encourage culinary exploration, and make meal planning effortless.
//             </p>
//             <p className="text-gray-300 leading-relaxed">
//               By combining cutting-edge technology with our passion for food, we're building a community where food lovers can discover, share, and create memorable dining experiences.
//             </p>
//           </div>
//         </div>

//         {/* Team Section with hover effects */}
//         <div className="mt-20 text-center opacity-0 animate-fade-in">
//           <h2 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-8">
//             Meet Our Developers
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
//             <a 
//               href="https://www.linkedin.com/in/samarthhitnalli/" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="group"
//             >
//               <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-700">
//                 <div className="mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
//                   <img 
//                     src="/dev1.jpeg" 
//                     alt="Garvit Nag"
//                     className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Samarth</h3>
//                 <p className="text-gray-400">Lead Developer</p>
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }

//         @keyframes slideInLeft {
//           from { transform: translateX(-50px); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }

//         @keyframes slideInRight {
//           from { transform: translateX(50px); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 6s ease infinite;
//         }

//         .animate-slide-up {
//           animation: slideUp 1s ease forwards;
//           animation-delay: 0.5s;
//         }

//         .animate-slide-in-left {
//           animation: slideInLeft 1s ease forwards;
//           animation-delay: 0.3s;
//         }

//         .animate-slide-in-right {
//           animation: slideInRight 1s ease forwards;
//           animation-delay: 0.3s;
//         }

//         .animate-fade-in {
//           animation: fadeIn 1s ease forwards;
//           animation-delay: 0.2s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutUs;

// src/components/About.tsx
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Animated component with reveal effect
const RevealElement: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/food-pattern.svg')] opacity-5 z-0"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative z-10">
          <RevealElement>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              About <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">Nutri<span className="font-normal">Mate</span></span>
            </h1>
          </RevealElement>
          
          <RevealElement delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light">
              Your intelligent culinary companion transforming the way you discover and create amazing dishes.
            </p>
          </RevealElement>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Vision Section */}
        <div className="mb-32">
          <RevealElement>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 space-y-6">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-900/30 text-purple-300 rounded-full mb-2">Our Vision</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">
                  Making cooking accessible to everyone
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We believe cooking should be an accessible, enjoyable, and creative experience for everyone. Our platform inspires kitchen confidence, encourages culinary exploration, and makes meal planning effortless.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  By combining cutting-edge technology with our passion for food, we're building a community where food lovers can discover, share, and create memorable dining experiences.
                </p>
              </div>
              
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/5">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src="/about2.png"
                    alt="Our Vision" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </RevealElement>
        </div>
        
        {/* Technology Section */}
        <div className="mb-32">
          <RevealElement>
            <div className="flex flex-col-reverse md:flex-row gap-16 items-center">
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/5">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src="/about1.png"
                    alt="AI-Powered Recipe Discovery" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 space-y-6">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-900/30 text-purple-300 rounded-full mb-2">Our Technology</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">
                  AI-powered recipe discovery
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                NutriMate harnesses advanced AI to understand your unique preferences, dietary requirements, and available ingredients. Search by text, upload images of ingredients, or fill out detailed forms to find perfectly matched recipes.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Our intelligent recommendation system learns from your interactions, making each suggestion more personalized than the last. From quick weekday dinners to elaborate weekend feasts, NutriMate is your trusted kitchen companion.
                </p>
              </div>
            </div>
          </RevealElement>
        </div>
        
        {/* Features Grid */}
        <div className="mb-32">
          <RevealElement>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-900/30 text-purple-300 rounded-full mb-2">Features</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                What makes NutriMate special
              </h2>
            </div>
          </RevealElement>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Smart Search",
                description: "Find recipes based on ingredients, dietary needs, or cuisine preferences"
              },
              {
                icon: "📷",
                title: "Image Recognition",
                description: "Upload photos of your ingredients and let AI suggest perfect recipes"
              },
              {
                icon: "🧠",
                title: "Personalized Recommendations",
                description: "Our system learns your tastes and suggests dishes you'll love"
              },
              {
                icon: "🍽️",
                title: "Meal Planning",
                description: "Plan your weekly meals with smart shopping lists and prep guides"
              },
              {
                icon: "⏱️",
                title: "Time-Based Filtering",
                description: "Find recipes that match how much time you have available"
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Community Sharing",
                description: "Share your favorite recipes and discover community favorites"
              }
            ].map((feature, index) => (
              <RevealElement key={index} delay={0.1 * index}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </RevealElement>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div>
          <RevealElement>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-900/30 text-purple-300 rounded-full mb-2">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Meet the developers
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Passionate technologists and food enthusiasts committed to revolutionizing your cooking experience
              </p>
            </div>
          </RevealElement>
          
          <div className="flex justify-center">
            <RevealElement delay={0.2}>
              <a 
                href="https://www.linkedin.com/in/samarthhitnalli/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 text-center max-w-sm">
                  <div className="relative mb-6 mx-auto">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto ring-4 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all duration-300">
                      <img 
                        src="/dev1.jpeg" 
                        alt="Samarth" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium mb-1">Samarth</h3>
                  <p className="text-purple-400 mb-4">Lead Developer</p>
                  <p className="text-gray-400">
                    Combining advanced AI knowledge with a passion for culinary arts to create intuitive cooking solutions.
                  </p>
                </div>
              </a>
            </RevealElement>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative overflow-hidden py-24 mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <RevealElement>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
              Ready to transform your cooking experience?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of food enthusiasts discovering new recipes tailored to their preferences every day.
            </p>
            <a 
              href="/auth" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium text-lg transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Get Started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </RevealElement>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;