// /* eslint-disable react/jsx-key */
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useEffect, useState } from "react";
// import { Star, Clock, Flame, X } from "lucide-react";
// import { account } from "@/lib/appwrite";

// interface Recipe {
//   RecipeId: number;
//   Name: string;
//   RecipeCategory: string;
//   RecipeIngredientParts: string[];
//   RecipeIngredientQuantities: string[];
//   Keywords: string[];
//   keywords_name: string[];
//   Calories: number;
//   TotalTime_minutes: number;
//   AggregatedRating: number;
//   ReviewCount: number;
//   Description: string;
//   RecipeInstructions: string[];
//   Images: string[];
//   Similarity: number;
// }

// interface ButtonProps {
//   children: React.ReactNode;
//   className?: string;
//   [key: string]: any;
// }

// const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
//   <button
//   className={`bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-6 rounded-full hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// interface DialogProps {
//   open: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
//       <div className="bg-zinc-900 text-white rounded-lg max-w-4xl w-full m-4 max-h-[90vh] overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// };

// interface ScrollAreaProps {
//   children: React.ReactNode;
//   className?: string;
// }

// const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className }) => (
//   <div className={`overflow-auto ${className}`}>
//     {children}
//   </div>
// );

// const RecommendationsPage: React.FC = () => {
//   const [recommendations, setRecommendations] = useState<Recipe[]>([]);
//   const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSessionLoading, setIsSessionLoading] = useState(true);
//   const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserSession = async () => {
//       try {
//         const session = await account.getSession('current');
//         console.log('Session:', session);
//         if (session) {
//           setUserId(session.userId);
//           console.log('User ID:', session.userId);
//         }
//       } catch (error) {
//          console.error('Error fetching user session:', error);
//        }finally {
//         setIsSessionLoading(false);  // Add this line here
//       }
//     };
//     fetchUserSession();
//   }, []);

//   useEffect(() => {
//     const handleRecommendations = async () => {
//       try {
//         const storedRecommendations = sessionStorage.getItem('recommendations');
//         console.log('[Storage Debug] Stored recommendations exist:', !!storedRecommendations);
        
//         if (storedRecommendations) {
//           const parsedRecommendations = JSON.parse(storedRecommendations);
//           console.log('[Storage Debug] Parsed recommendations count:', parsedRecommendations.length);
          
//           // Set recommendations state for all users
//           setRecommendations(parsedRecommendations);
          
//           // Save to MongoDB only for logged-in users
//           if (userId) {
//             try {
//               console.log('[MongoDB Debug] Attempting to save to MongoDB. UserId:', userId);
              
//               const response = await fetch('/api/search-history', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   userId,
//                   searchData: parsedRecommendations,
//                   totalResults: parsedRecommendations.length
//                 }),
//               });
              
//               const responseData = await response.json();
//               console.log('[MongoDB Debug] Save response:', responseData);
              
//               if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//               }
//             } catch (mongoError) {
//               console.error('[MongoDB Error] Failed to save to MongoDB:', mongoError);
//             }
//           } else {
//             console.log('[Info] User not logged in, skipping MongoDB save');
//           }
          
//           // Clear storage after displaying recommendations (for all users)
//           sessionStorage.removeItem('recommendations');
//           console.log('[Storage Debug] Recommendations cleared from session storage');
//         } else {
//           console.log('[Storage Debug] No recommendations found in session storage');
//         }
//       } catch (error) {
//         console.error('[General Error] Error processing recommendations:', error);
//       } finally {
//         setTimeout(() => {
//           setIsRecommendationsLoading(false);
//         }, 1000);
//       }
//     };

//     // Call handleRecommendations when isSessionLoading is false
//     if (!isSessionLoading) {
//       handleRecommendations();
//     }
//   }, [userId, isSessionLoading]); 

//   const defaultImageUrl = "default.png";

//   const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
//     <div
//       className="bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full"
//       onClick={() => setSelectedRecipe(recipe)}
//     >
//       <div className="relative">
//         <img
//           src={recipe.Images[0] || defaultImageUrl}
//           alt={recipe.Name}
//           className="w-full h-56 object-cover"
//           loading="lazy"
//           onError={(e) => (e.currentTarget.src = defaultImageUrl)}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
//         <div className="absolute top-3 right-3 bg-yellow-400 rounded-full p-2 flex items-center space-x-1">
//           <Star className="w-4 h-4 text-gray-900" />
//           <span className="font-bold text-gray-900">{recipe.AggregatedRating.toFixed(1)}</span>
//         </div>
//         <h3 className="absolute bottom-3 left-3 text-white font-bold text-xl truncate w-11/12">
//           {recipe.Name}
//         </h3>
//       </div>
//       <div className="p-4 text-white">
//         <p className="text-sm text-gray-300 mb-3 line-clamp-2">{recipe.Description}</p>
//         <div className="flex justify-between text-sm">
//           <span className="flex items-center bg-zinc-700 rounded-full px-3 py-1">
//             <Flame className="w-4 h-4 text-red-400 mr-2" />
//             {recipe.Calories.toFixed(0)} cal
//           </span>
//           <span className="flex items-center bg-zinc-700 rounded-full px-3 py-1">
//             <Clock className="w-4 h-4 text-blue-400 mr-2" />
//             {recipe.TotalTime_minutes} mins
//           </span>
//         </div>
//       </div>
//     </div>
//   );

//   const RecipeCardSkeleton: React.FC = () => (
//     <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-xl overflow-hidden shadow-lg h-full">
//       <div className="relative">
//         {/* Image skeleton */}
//         <div className="w-full h-56 bg-gradient-to-r from-zinc-800 to-zinc-700 animate-pulse" />
        
//         {/* Rating badge skeleton */}
//         <div className="absolute top-3 right-3 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full w-16 h-8 animate-pulse" />
        
//         {/* Title skeleton */}
//         <div className="absolute bottom-3 left-3 w-3/4">
//           <div className="h-6 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded animate-pulse" />
//         </div>
//       </div>
      
//       <div className="p-4">
//         {/* Description skeleton */}
//         <div className="space-y-2 mb-3">
//           <div className="h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded animate-pulse" />
//           <div className="h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded animate-pulse w-3/4" />
//         </div>
        
//         {/* Stats container */}
//         <div className="flex justify-between text-sm">
//           {/* Calories skeleton */}
//           <div className="bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full h-8 w-24 animate-pulse" />
          
//           {/* Time skeleton */}
//           <div className="bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full h-8 w-24 animate-pulse" />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen pt-24 bg-gradient-to-b from-[#0f0f0f] via-[#1c1c1c] to-[#252525] p-8 overflow-x-hidden" style={{
//       backgroundImage: `url('/bg.png')`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}>
//       {(isSessionLoading || isRecommendationsLoading) ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[...Array(6)].map((_, index) => (
//             <RecipeCardSkeleton key={index} />
//           ))}
//         </div>
//       ) : recommendations.length === 0 ? (
//         <div className="text-white text-center p-10 text-2xl">No recommendations found. Try searching through form.</div>
//       ) : (
//         <div className="mt-12">
//       <h1 className="text-4xl font-bold text-center mb-1 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Recipe Recommendations</h1>
//       <div className="max-w-8xl mx-auto px-6 mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
//           {recommendations.slice(0, 6).map((recipe) => (
//             <div className="h-full">
//               <RecipeCard key={recipe.RecipeId} recipe={recipe} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )}

//       <Dialog open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)}>
//         {selectedRecipe && (
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-3xl font-bold">{selectedRecipe.Name}</h2>
//               <button
//                 onClick={() => setSelectedRecipe(null)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <ScrollArea className="max-h-[calc(80vh-4rem)] pr-4">
//               <div className="space-y-6">
//                 <img
//                   src={selectedRecipe.Images[0] || defaultImageUrl}
//                   alt={selectedRecipe.Name}
//                   className="w-full h-56 object-cover rounded-lg"
//                   onError={(e) => (e.currentTarget.src = defaultImageUrl)}
//                 />
//                 <div className="flex justify-between items-center bg-zinc-800 p-4 rounded-lg">
//                   <div className="flex items-center">
//                     <Star className="w-6 h-6 text-yellow-400 mr-2" />
//                     <span className="text-lg">{selectedRecipe.AggregatedRating.toFixed(1)} ({selectedRecipe.ReviewCount} reviews)</span>
//                   </div>
//                   <div className="flex space-x-4">
//                     <span className="flex items-center bg-zinc-700 rounded-full px-4 py-2">
//                       <Flame className="w-5 h-5 text-red-400 mr-2" />
//                       {selectedRecipe.Calories.toFixed(0)} cal
//                     </span>
//                     <span className="flex items-center bg-zinc-700 rounded-full px-4 py-2">
//                       <Clock className="w-5 h-5 text-blue-400 mr-2" />
//                       {selectedRecipe.TotalTime_minutes} mins
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 text-lg">{selectedRecipe.Description}</p>
//                 <div className="bg-zinc-800 p-4 rounded-lg">
//                   <h4 className="text-xl font-semibold mb-2">Category</h4>
//                   <p className="text-gray-300">{selectedRecipe.RecipeCategory}</p>
//                 </div>
//                 <div className="bg-zinc-800 p-4 rounded-lg">
//                   <h4 className="text-xl font-semibold mb-2">Keywords</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedRecipe.Keywords.map((keyword, index) => (
//                       <span key={index} className="bg-zinc-700 text-gray-300 px-3 py-1 rounded-full text-sm">{keyword}</span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-zinc-800 p-4 rounded-lg">
//                   <h4 className="text-xl font-semibold mb-2">Ingredients</h4>
//                   <ul className="list-disc list-inside text-gray-300 space-y-2">
//                     {selectedRecipe.RecipeIngredientParts.map((ingredient, index) => (
//                       <li key={index}>
//                         <span className="font-medium">{selectedRecipe.RecipeIngredientQuantities[index]}</span> {ingredient}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="bg-zinc-800 p-4 rounded-lg">
//                   <h4 className="text-xl font-semibold mb-2">Instructions</h4>
//                   <ol className="list-decimal list-inside text-gray-300 space-y-4">
//                     {selectedRecipe.RecipeInstructions.map((instruction, index) => (
//                       <li key={index} className="pl-2">{instruction}</li>
//                     ))}
//                   </ol>
//                 </div>
//                 <div className="bg-zinc-800 p-4 rounded-lg">
//                   <h4 className="text-xl font-semibold mb-2">Similarity</h4>
//                   <div className="w-full bg-zinc-700 rounded-full h-4">
//                     <div
//                       className="bg-green-500 h-4 rounded-full"
//                       style={{ width: `${selectedRecipe.Similarity * 100}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-gray-300 mt-2">{(selectedRecipe.Similarity * 100).toFixed(2)}% match</p>
//                 </div>
//               </div>
//             </ScrollArea>
//           </div>
//         )}
//       </Dialog>
//       <div className="mt-12 text-center">
//         <Button onClick={() => window.location.href = "/form"}>
//           Back to Recommendation Form
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RecommendationsPage;

/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Star, Clock, Flame, X, ChevronLeft, Search, Heart } from "lucide-react";
import { account } from "@/lib/appwrite";
import { motion, AnimatePresence } from "framer-motion";

interface Recipe {
  RecipeId: number;
  Name: string;
  RecipeCategory: string;
  RecipeIngredientParts: string[];
  RecipeIngredientQuantities: string[];
  Keywords: string[];
  keywords_name: string[];
  Calories: number;
  TotalTime_minutes: number;
  AggregatedRating: number;
  ReviewCount: number;
  Description: string;
  RecipeInstructions: string[];
  Images: string[];
  Similarity: number;
}

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="bg-zinc-900 text-white rounded-2xl max-w-4xl w-full m-4 max-h-[90vh] overflow-hidden border border-zinc-700 shadow-2xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className }) => (
  <div className={`overflow-auto ${className} scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800`}>
    {children}
  </div>
);

const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(72); // Default navbar height estimate

  // Effect to calculate actual navbar height
  useEffect(() => {
    const navbar = document.querySelector('nav'); // Adjust selector if needed
    if (navbar) {
      const height = navbar.getBoundingClientRect().height;
      setNavbarHeight(height);
    }
  }, []);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const session = await account.getSession('current');
        if (session) {
          setUserId(session.userId);
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
      } finally {
        setIsSessionLoading(false);
      }
    };
    fetchUserSession();
  }, []);

  useEffect(() => {
    const handleRecommendations = async () => {
      try {
        const storedRecommendations = sessionStorage.getItem('recommendations');
        
        if (storedRecommendations) {
          const parsedRecommendations = JSON.parse(storedRecommendations);
          
          // Set recommendations state for all users
          setRecommendations(parsedRecommendations);
          
          // Save to MongoDB only for logged-in users
          if (userId) {
            try {
              const response = await fetch('/api/search-history', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId,
                  searchData: parsedRecommendations,
                  totalResults: parsedRecommendations.length
                }),
              });
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            } catch (mongoError) {
              console.error('[MongoDB Error] Failed to save to MongoDB:', mongoError);
            }
          }
          
          // Clear storage after displaying recommendations
          sessionStorage.removeItem('recommendations');
        }
      } catch (error) {
        console.error('[General Error] Error processing recommendations:', error);
      } finally {
        setTimeout(() => {
          setIsRecommendationsLoading(false);
        }, 1000);
      }
    };

    if (!isSessionLoading) {
      handleRecommendations();
    }
  }, [userId, isSessionLoading]);

  // Get unique categories
  const categories = recommendations.length > 0 
    ? [...new Set(recommendations.map(recipe => recipe.RecipeCategory))]
    : [];

  // Filter recipes based on search and category
  const filteredRecipes = recommendations.filter(recipe => {
    const matchesSearch = recipe.Name.toLowerCase().includes(filter.toLowerCase()) ||
                          recipe.Description.toLowerCase().includes(filter.toLowerCase()) ||
                          recipe.Keywords.some(keyword => keyword.toLowerCase().includes(filter.toLowerCase()));
    
    const matchesCategory = !activeCategory || recipe.RecipeCategory === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const defaultImageUrl = "/default.png";

  const RecipeCard: React.FC<{ recipe: Recipe; index: number }> = ({ recipe, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
      }}
      className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden shadow-xl h-full relative group"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        <img
          src={recipe.Images[0] || defaultImageUrl}
          alt={recipe.Name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = defaultImageUrl)}
        />
        <div className="absolute top-3 right-3 bg-yellow-400 rounded-full p-2 flex items-center space-x-1 z-20">
          <Star className="w-4 h-4 text-gray-900" />
          <span className="font-bold text-gray-900">{recipe.AggregatedRating.toFixed(1)}</span>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 left-3 bg-red-500/80 hover:bg-red-600 rounded-full p-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Favorite", recipe.Name);
          }}
        >
          <Heart className="w-4 h-4 text-white" />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full p-4 z-20">
          <h3 className="text-white font-bold text-xl line-clamp-2">
            {recipe.Name}
          </h3>
          <span className="text-sm text-gray-300 bg-zinc-800/80 px-3 py-1 rounded-full inline-block mt-2">
            {recipe.RecipeCategory}
          </span>
        </div>
      </div>
      <div className="p-4 text-white">
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{recipe.Description}</p>
        <div className="flex justify-between text-sm">
          <span className="flex items-center bg-zinc-700 rounded-full px-3 py-1">
            <Flame className="w-4 h-4 text-red-400 mr-2" />
            {recipe.Calories.toFixed(0)} cal
          </span>
          <span className="flex items-center bg-zinc-700 rounded-full px-3 py-1">
            <Clock className="w-4 h-4 text-blue-400 mr-2" />
            {recipe.TotalTime_minutes} mins
          </span>
        </div>
        <div className="mt-3 w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${recipe.Similarity * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1 text-gray-400">{(recipe.Similarity * 100).toFixed(0)}% match</p>
      </div>
    </motion.div>
  );

  const RecipeCardSkeleton: React.FC = () => (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden shadow-lg h-full">
      <div className="relative">
        {/* Image skeleton */}
        <div className="w-full h-56 bg-gradient-to-r from-zinc-800 to-zinc-700 animate-pulse" />
        
        {/* Rating badge skeleton */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full w-16 h-8 animate-pulse" />
        
        {/* Title skeleton */}
        <div className="absolute bottom-3 left-3 w-3/4">
          <div className="h-6 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded animate-pulse" />
          <div className="h-4 w-24 mt-2 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="p-4">
        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded animate-pulse w-3/4" />
        </div>
        
        {/* Stats container */}
        <div className="flex justify-between text-sm">
          {/* Calories skeleton */}
          <div className="bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full h-8 w-24 animate-pulse" />
          
          {/* Time skeleton */}
          <div className="bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full h-8 w-24 animate-pulse" />
        </div>
        
        {/* Match bar skeleton */}
        <div className="mt-3 w-full h-2 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full animate-pulse" />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0f0f0f] p-4 md:p-8 overflow-x-hidden"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: `calc(${navbarHeight}px + 2rem)`, // Dynamic padding based on navbar height
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
          Your Recipe Recommendations
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Discover delicious dishes tailored to your preferences
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search recipes..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <Button
            onClick={() => window.location.href = "/form"}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 min-w-40"
          >
            New Search
          </Button>
        </div>
        
        {categories.length > 0 && (
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${!activeCategory ? 'bg-green-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </motion.button>
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === category ? 'bg-green-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {(isSessionLoading || isRecommendationsLoading) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[...Array(6)].map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredRecipes.length === 0 && recommendations.length > 0 ? (
        <div className="text-white text-center p-10 bg-zinc-800/70 rounded-2xl max-w-lg mx-auto backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-2">No matching recipes</h3>
          <p className="text-gray-300 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={() => {setFilter(""); setActiveCategory(null);}}>
            Clear filters
          </Button>
        </div>
      ) : recommendations.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center p-10 bg-zinc-800/70 rounded-2xl max-w-lg mx-auto backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-2">No recommendations found</h3>
          <p className="text-gray-300 mb-4">Try searching for recipes using our recommendation form</p>
          <Button onClick={() => window.location.href = "/form"}>
            Go to Recommendation Form
          </Button>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.RecipeId} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      )}

      <Dialog open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <div className="flex flex-col h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-zinc-700">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedRecipe(null)}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <h2 className="text-2xl font-bold text-center flex-1 mx-4 truncate">{selectedRecipe.Name}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedRecipe(null)}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedRecipe.Images[0] || defaultImageUrl}
                    alt={selectedRecipe.Name}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={(e) => (e.currentTarget.src = defaultImageUrl)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.Keywords.slice(0, 5).map((keyword, index) => (
                        <span key={index} className="bg-black/50 text-white backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                      {selectedRecipe.Keywords.length > 5 && (
                        <span className="bg-black/50 text-white backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          +{selectedRecipe.Keywords.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
                  <div className="bg-zinc-800 rounded-lg p-4 flex items-center w-full md:w-1/3">
                    <Star className="w-6 h-6 text-yellow-400 mr-3" />
                    <div>
                      <div className="text-lg font-bold">{selectedRecipe.AggregatedRating.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">{selectedRecipe.ReviewCount} reviews</div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-800 rounded-lg p-4 flex items-center w-full md:w-1/3">
                    <Flame className="w-6 h-6 text-red-400 mr-3" />
                    <div>
                      <div className="text-lg font-bold">{selectedRecipe.Calories.toFixed(0)}</div>
                      <div className="text-sm text-gray-400">calories</div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-800 rounded-lg p-4 flex items-center w-full md:w-1/3">
                    <Clock className="w-6 h-6 text-blue-400 mr-3" />
                    <div>
                      <div className="text-lg font-bold">{selectedRecipe.TotalTime_minutes}</div>
                      <div className="text-sm text-gray-400">minutes</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedRecipe.Description}</p>
                </div>
                
                <div className="bg-zinc-800 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.RecipeIngredientParts.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-green-500 h-2 w-2 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>
                          <span className="font-medium text-green-400">{selectedRecipe.RecipeIngredientQuantities[index]}</span> {ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-zinc-800 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {selectedRecipe.RecipeInstructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="bg-zinc-700 text-white font-bold h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="bg-zinc-800 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-2">Similarity Match</h3>
                  <div className="w-full bg-zinc-700 rounded-full h-4 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedRecipe.Similarity * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-gray-300">{(selectedRecipe.Similarity * 100).toFixed(2)}% match to your preferences</p>
                </div>
              </div>
            </ScrollArea>
            
            <div className="p-6 border-t border-zinc-700 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-4 rounded-lg"
                onClick={() => setSelectedRecipe(null)}
              >
                <ChevronLeft className="w-4 h-4" />
                Back to recipes
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-lg"
              >
                <Heart className="w-4 h-4" />
                Save to favorites
              </motion.button>
            </div>
          </div>
        )}
      </Dialog>
    </motion.div>
  );
};

export default RecommendationsPage;