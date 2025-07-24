// 'use client';
// import React, { useEffect, useState, useRef } from "react";
// import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
// import { account, databases } from '@/lib/appwrite'; 
// import { Query } from 'appwrite';
// import { cn } from "@/components/utils/cn";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const router = useRouter();
//   const [bgColor, setBgColor] = useState("transparent");
//   const profileRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: { target: any; }) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // First check if there's an active session
//         const promise = account.get();
//         promise.then(
//           async (response) => {
//             // User is logged in, fetch additional data
//             const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
//             const collectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';
            
//             const userDocs = await databases.listDocuments(
//               databaseId,
//               collectionId,
//               [Query.equal('userId', response.$id)]
//             );
  
//             if (userDocs.documents.length > 0) {
//               const user = userDocs.documents[0];
//               setCurrentUser({
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar
//               });
//             }
//           },
//           (error) => {
//             // User is not logged in, just set currentUser to null
//             setCurrentUser(null);
//           }
//         );
//       } catch (error) {
//         // Handle any other errors
//         console.error('Error checking authentication status:', error);
//         setCurrentUser(null);
//       }
//     };
  
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await account.deleteSessions();
//       setCurrentUser(null);
//       router.push("/");
//       setIsProfileOpen(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//       setCurrentUser(null);
//       setIsProfileOpen(false);
//     }
//   };

//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;
//     setVisible(currentScrollY <= lastScrollY || currentScrollY < 10);
//     setBgColor(currentScrollY > 0 ? "bg-black/80" : "transparent");
//     setLastScrollY(currentScrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <>
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
      
//       <div className={cn(
//         "fixed top-0 right-0 w-full transition-all duration-300",
//         "z-50",
//         visible ? "translate-y-0" : "-translate-y-full",
//         bgColor,
//         className
//       )}>
//         <Menu setActive={setActive}>
//           {/* Rest of the desktop menu structure remains the same */}
//           <div className="relative flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-4">
//             <Link href="/" className="flex-shrink-0 z-50">
//               <img 
//                 src="/logo.png" 
//                 alt="Logo" 
//                 className="h-8 sm:h-10 lg:h-12 transition-transform duration-200 hover:scale-105" 
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-8 xl:space-x-14">
//               <Link href="/" className="relative group py-2">
//                 <span className="text-white transition-transform duration-200 group-hover:-translate-y-1">
//                   Home
//                 </span>
//                 <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//               </Link>
//               <Link href="/about" className="relative group py-2">
//                 <span className="text-white transition-transform duration-200 group-hover:-translate-y-1">
//                   About
//                 </span>
//                 <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//               </Link>
//               <Link href="/form" className="relative group py-2">
//                 <span className="text-white transition-transform duration-200 group-hover:-translate-y-1">
//                   Search
//                 </span>
//                 <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//               </Link>
//               <Link href="/contact" className="relative group py-2">
//                 <span className="text-white transition-transform duration-200 group-hover:-translate-y-1">
//                   Contact Us
//                 </span>
//                 <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//               </Link>
//             </div>

//             {/* Desktop Profile Menu */}
//             <div className="hidden lg:flex items-center" ref={profileRef}>
//               {currentUser ? (
//                 <div className="relative profile-menu">
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="flex items-center space-x-3 focus:outline-none transition-transform duration-200 hover:scale-105"
//                   >
//                     {currentUser.avatar ? (
//                       <Image
//                         src={currentUser.avatar}
//                         alt="Avatar"
//                         width={40}
//                         height={40}
//                         className="rounded-full border-2 border-white"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white text-lg">
//                         {currentUser.name[0].toUpperCase()}
//                       </div>
//                     )}
//                     <span className="text-white">{currentUser.name}</span>
//                   </button>

//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg py-1 border border-white/10">
//                       <Link href="/dashboard">
//                         <div className="relative group px-4 py-2 hover:bg-white/10">
//                           <span className="block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                             Dashboard
//                           </span>
//                         </div>
//                       </Link>
//                       <div className="border-t border-white/10 my-1"></div>
//                       <button
//                         onClick={handleLogout}
//                         className="relative group w-full text-left px-4 py-2 hover:bg-white/10"
//                       >
//                         <span className="block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                           Sign out
//                         </span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="group">
//                   <Link href="/auth" className="relative inline-block py-2">
//                     <span className="text-white transition-transform duration-200 group-hover:-translate-y-1">
//                       Login
//                     </span>
//                     <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                   </Link>
//                 </div>
//               )}
//             </div>
//             {/* Mobile Menu Button */}
//             <button 
//               onClick={() => setIsOpen(!isOpen)} 
//               className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-50"
//               aria-label="Toggle menu"
//             >
//               <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                 {isOpen ? (
//                   <path d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//           {/* Modified Mobile Menu */}
//           <div 
//             className={cn(
//               "lg:hidden fixed inset-0 z-50 h-screen",
//               "transition-transform duration-300 ease-in-out",
//               isOpen ? "translate-x-0" : "translate-x-full"
//             )}
//           >
//             <div className="absolute inset-0 backdrop-blur-md flex flex-col">
//               {/* Header with close button - Modified positioning */}
//               <div className="flex justify-end p-4 relative z-50">
//                 <button 
//                   onClick={() => setIsOpen(false)}
//                   className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative z-50"
//                   aria-label="Close menu"
//                 >
//                   <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Modified Content container */}
//               <div className="flex-1 flex flex-col items-center justify-center min-h-0 px-6 py-12">
//                 {/* User Profile Section */}
//                 {currentUser && (
//                   <div className="py-4 flex items-center space-x-4 border-b border-white/30">
//                     {currentUser.avatar ? (
//                       <Image
//                         src={currentUser.avatar}
//                         alt="Avatar"
//                         width={48}
//                         height={48}
//                         className="rounded-full border-2 border-white"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white text-xl">
//                         {currentUser.name[0].toUpperCase()}
//                       </div>
//                     )}
//                     <span className="text-white font-medium">{currentUser.name}</span>
//                   </div>
//                 )}

//                 {/* Navigation Links - Modified container */}
//                 <nav className="flex-1 flex flex-col items-center justify-center space-y-6">
//                   <Link href="/" className="relative group text-center">
//                     <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                       Home
//                     </span>
//                     <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                   </Link>
//                   <Link href="/about" className="relative group text-center">
//                     <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                       About
//                     </span>
//                     <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                   </Link>
//                   <Link href="/form" className="relative group text-center">
//                     <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                       Search
//                     </span>
//                     <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                   </Link>
//                   <Link href="/contact" className="relative group text-center">
//                     <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                       Contact Us
//                     </span>
//                     <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                   </Link>
//                 </nav>

//                 {/* Auth Section */}
//                 <div className="mt-0 mb-60 pt-6 border-t border-white/20 px-6">
//                   {currentUser ? (
//                     <div className="space-y-6 text-center">
//                       <Link href="/dashboard" className="relative group pt-1 w-full block">
//                         <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                           Dashboard
//                         </span>
//                         <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="relative group py-0 w-full text-center"
//                       >
//                         <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                           Sign out
//                         </span>
//                         <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                       </button>
//                     </div>
//                   ) : (
//                     <Link href="/auth" className="relative group py-0 w-full flex items-center justify-center">
//                       <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-1">
//                         Login
//                       </span>
//                       <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white/50 transition-all duration-300 origin-center group-hover:w-full group-hover:left-0"></span>
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Menu>
//       </div>
//     </>
//   );
// }

// export default Navbar;
// 'use client';
// import React, { useEffect, useState, useRef } from "react";
// import { account, databases } from '@/lib/appwrite'; 
// import { Query } from 'appwrite';
// import { cn } from "@/components/utils/cn";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// function Navbar({ className }: { className?: string }) {
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const router = useRouter();
//   const [bgOpacity, setBgOpacity] = useState(0);
//   const profileRef = useRef<HTMLDivElement | null>(null);
//   const mobileMenuRef = useRef<HTMLDivElement | null>(null);

//   // Handle clicks outside of profile dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const promise = account.get();
//         promise.then(
//           async (response) => {
//             const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
//             const collectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';
            
//             const userDocs = await databases.listDocuments(
//               databaseId,
//               collectionId,
//               [Query.equal('userId', response.$id)]
//             );
  
//             if (userDocs.documents.length > 0) {
//               const user = userDocs.documents[0];
//               setCurrentUser({
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar
//               });
//             }
//           },
//           () => setCurrentUser(null)
//         );
//       } catch (error) {
//         console.error('Error checking authentication status:', error);
//         setCurrentUser(null);
//       }
//     };
  
//     fetchUserData();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await account.deleteSessions();
//       setCurrentUser(null);
//       router.push("/");
//       setIsProfileOpen(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//       setCurrentUser(null);
//       setIsProfileOpen(false);
//     }
//   };

//   // Handle scroll events
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const totalHeight = document.body.scrollHeight - window.innerHeight;
      
//       // Calculate scroll progress for potential UI effects
//       const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;
//       setScrollProgress(progress);
      
//       // Control navbar visibility based on scroll direction
//       setVisible(currentScrollY <= lastScrollY || currentScrollY < 10);
      
//       // Adjust background opacity based on scroll position
//       const opacity = Math.min(currentScrollY / 200, 0.95);
//       setBgOpacity(opacity);
      
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     const handleRouteChange = () => {
//       setIsOpen(false);
//     };

//     window.addEventListener('popstate', handleRouteChange);
//     return () => window.removeEventListener('popstate', handleRouteChange);
//   }, []);

//   // Navigation links array for DRY code
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/form", label: "Search" },
//     { href: "/contact", label: "Contact" }
//   ];

//   return (
//     <>
//       {/* Backdrop for mobile menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>
      
//       {/* Navbar Container */}
//       <motion.div 
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 w-full",
//           "transition-all duration-300",
//           className
//         )}
//         initial={{ y: 0 }}
//         animate={{ y: visible ? 0 : -100 }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Progress bar */}
//         <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600" style={{ width: `${scrollProgress * 100}%` }} />
        
//         {/* Navbar content with glass effect */}
//         <div 
//           className="w-full backdrop-blur-md transition-colors duration-300 border-b border-white/10"
//           style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="relative flex justify-between items-center w-full py-4">
//               {/* Logo */}
//               <Link href="/" className="flex-shrink-0 z-50 group">
//                 <motion.img 
//                   src="/logo.png" 
//                   alt="Logo" 
//                   className="h-8 sm:h-10 lg:h-10 transition-all duration-300" 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 />
//               </Link>

//               {/* Desktop Navigation */}
//               <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
//                 {navLinks.map((link) => (
//                   <NavLink key={link.href} href={link.href}>
//                     {link.label}
//                   </NavLink>
//                 ))}
//               </div>

//               {/* Desktop Profile Menu */}
//               <div className="hidden lg:flex items-center" ref={profileRef}>
//                 {currentUser ? (
//                   <div className="relative">
//                     <motion.button
//                       onClick={() => setIsProfileOpen(!isProfileOpen)}
//                       className="flex items-center space-x-3 focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {currentUser.avatar ? (
//                         <div className="relative">
//                           <Image
//                             src={currentUser.avatar}
//                             alt="Avatar"
//                             width={36}
//                             height={36}
//                             className="rounded-full border-2 border-white/50"
//                           />
//                           <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-pulse" />
//                         </div>
//                       ) : (
//                         <div className="relative w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white border-2 border-white/50 text-sm">
//                           {currentUser.name[0].toUpperCase()}
//                         </div>
//                       )}
//                       <span className="text-white text-sm font-medium">{currentUser.name}</span>
//                       <svg className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </motion.button>

//                     <AnimatePresence>
//                       {isProfileOpen && (
//                         <motion.div 
//                           initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute right-0 mt-2 w-56 bg-black/80 backdrop-blur-md rounded-xl shadow-lg py-2 border border-white/10 overflow-hidden"
//                         >
//                           <div className="px-4 py-3 border-b border-white/10">
//                             <p className="text-sm text-white font-medium">{currentUser.name}</p>
//                             <p className="text-xs text-white/70 truncate">{currentUser.email}</p>
//                           </div>
                          
//                           <Link href="/dashboard">
//                             <motion.div 
//                               className="flex items-center px-4 py-2 hover:bg-white/10 text-sm text-white"
//                               whileHover={{ x: 5 }}
//                             >
//                               <svg className="w-4 h-4 mr-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                               </svg>
//                               Dashboard
//                             </motion.div>
//                           </Link>
                          
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center px-4 py-2 hover:bg-white/10 text-sm text-white w-full text-left"
//                           >
//                             <svg className="w-4 h-4 mr-3 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                             </svg>
//                             Sign out
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ) : (
//                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                     <Link href="/auth" className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium transition-all hover:from-purple-700 hover:to-pink-700">
//                       <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                       Login
//                     </Link>
//                   </motion.div>
//                 )}
//               </div>
              
//               {/* Mobile Menu Button */}
//               <motion.button 
//                 onClick={() => setIsOpen(!isOpen)} 
//                 className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-50"
//                 aria-label="Toggle menu"
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                   {isOpen ? (
//                     <path d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             ref={mobileMenuRef}
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="lg:hidden fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-black/95 backdrop-blur-md shadow-xl"
//           >
//             <div className="flex flex-col h-full">
//               {/* Mobile Menu Header */}
//               <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
//                 <Link href="/" onClick={() => setIsOpen(false)}>
//                   <img 
//                     src="/logo.png" 
//                     alt="Logo" 
//                     className="h-8 transition-transform duration-200" 
//                   />
//                 </Link>
//                 <motion.button 
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 text-white hover:bg-white/10 rounded-full"
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </motion.button>
//               </div>
              
//               {/* User Profile Section */}
//               {currentUser && (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="px-6 py-4 border-b border-white/10 flex items-center space-x-4"
//                 >
//                   {currentUser.avatar ? (
//                     <Image
//                       src={currentUser.avatar}
//                       alt="Avatar"
//                       width={48}
//                       height={48}
//                       className="rounded-full border-2 border-white/50"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white border-2 border-white/50 text-xl">
//                       {currentUser.name[0].toUpperCase()}
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-white font-medium">{currentUser.name}</h3>
//                     <p className="text-white/70 text-sm truncate">{currentUser.email}</p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Navigation Links */}
//               <div className="flex-1 overflow-y-auto px-6 py-8">
//                 <nav className="flex flex-col space-y-6">
//                   {navLinks.map((link, index) => (
//                     <motion.div
//                       key={link.href}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 + index * 0.1 }}
//                     >
//                       <Link 
//                         href={link.href}
//                         onClick={() => setIsOpen(false)}
//                         className="group flex items-center text-lg text-white hover:text-purple-300 transition-colors"
//                       >
//                         <span className="relative overflow-hidden">
//                           {link.label}
//                           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
//                         </span>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </nav>
//               </div>
              
//               {/* Auth Section */}
//               <div className="border-t border-white/10 px-6 py-4">
//                 {currentUser ? (
//                   <div className="space-y-4">
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.6 }}
//                     >
//                       <Link 
//                         href="/dashboard" 
//                         onClick={() => setIsOpen(false)}
//                         className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
//                       >
//                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                         </svg>
//                         <span>Dashboard</span>
//                       </Link>
//                     </motion.div>
                    
//                     <motion.button
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.7 }}
//                       onClick={handleLogout}
//                       className="flex items-center space-x-2 text-white hover:text-pink-300 transition-colors w-full"
//                     >
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       <span>Sign out</span>
//                     </motion.button>
//                   </div>
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                   >
//                     <Link 
//                       href="/auth" 
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-3 px-4 w-full hover:from-purple-700 hover:to-pink-700 transition-all"
//                     >
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                       <span>Login</span>
//                     </Link>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // Reusable NavLink component
// const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
//   return (
//     <Link href={href} className="relative group p-3">
//       <span className="text-white transition-colors duration-200 text-sm font-medium">
//         {children}
//       </span>
//       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
//     </Link>
//   );
// };

// export default Navbar;
// 'use client';
// import React, { useEffect, useState, useRef } from "react";
// import { account, databases } from '@/lib/appwrite'; 
// import { Query } from 'appwrite';
// import { cn } from "@/components/utils/cn";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// function Navbar({ className }: { className?: string }) {
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const router = useRouter();
//   const pathname = usePathname(); // Get current pathname for active link styling
//   const [bgOpacity, setBgOpacity] = useState(0);
//   const profileRef = useRef<HTMLDivElement | null>(null);
//   const mobileMenuRef = useRef<HTMLDivElement | null>(null);

//   // Handle clicks outside of profile dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const promise = account.get();
//         promise.then(
//           async (response) => {
//             const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
//             const collectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';
            
//             const userDocs = await databases.listDocuments(
//               databaseId,
//               collectionId,
//               [Query.equal('userId', response.$id)]
//             );
  
//             if (userDocs.documents.length > 0) {
//               const user = userDocs.documents[0];
//               setCurrentUser({
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar
//               });
//             }
//           },
//           () => setCurrentUser(null)
//         );
//       } catch (error) {
//         console.error('Error checking authentication status:', error);
//         setCurrentUser(null);
//       }
//     };
  
//     fetchUserData();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await account.deleteSessions();
//       setCurrentUser(null);
//       router.push("/");
//       setIsProfileOpen(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//       setCurrentUser(null);
//       setIsProfileOpen(false);
//     }
//   };

//   // Handle scroll events
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const totalHeight = document.body.scrollHeight - window.innerHeight;
      
//       // Calculate scroll progress for potential UI effects
//       const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;
//       setScrollProgress(progress);
      
//       // Control navbar visibility based on scroll direction
//       setVisible(currentScrollY <= lastScrollY || currentScrollY < 10);
      
//       // Adjust background opacity based on scroll position
//       const opacity = Math.min(currentScrollY / 200, 0.95);
//       setBgOpacity(opacity);
      
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsOpen(false); // Close mobile menu when path changes
//   }, [pathname]);

//   // Navigation links array for DRY code
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/form", label: "Search" },
//     { href: "/contact", label: "Contact" }
//   ];

//   return (
//     <>
//       {/* Backdrop for mobile menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>
      
//       {/* Navbar Container */}
//       <div 
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 w-full",
//           "transition-all duration-300",
//           visible ? "translate-y-0" : "-translate-y-full",
//           className
//         )}
//       >
//         {/* Progress bar */}
//         <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600" style={{ width: `${scrollProgress * 100}%` }} />
        
//         {/* Navbar content with glass effect */}
//         <div 
//           className="w-full backdrop-blur-md transition-colors duration-300 border-b border-white/10"
//           style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="relative flex justify-between items-center w-full py-4">
//               {/* Logo */}
//               <Link href="/" className="flex-shrink-0 z-50 group">
//                 <img 
//                   src="/logo.png" 
//                   alt="Logo" 
//                   className="h-8 sm:h-10 lg:h-10 transition-transform duration-200 hover:scale-105" 
//                 />
//               </Link>

//               {/* Desktop Navigation */}
//               <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
//                 {navLinks.map((link) => (
//                   <NavLink 
//                     key={link.href} 
//                     href={link.href} 
//                     isActive={pathname === link.href}
//                   >
//                     {link.label}
//                   </NavLink>
//                 ))}
//               </div>

//               {/* Desktop Profile Menu */}
//               <div className="hidden lg:flex items-center" ref={profileRef}>
//                 {currentUser ? (
//                   <div className="relative">
//                     <button
//                       onClick={() => setIsProfileOpen(!isProfileOpen)}
//                       className="flex items-center space-x-3 focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
//                     >
//                       {currentUser.avatar ? (
//                         <div className="relative">
//                           <Image
//                             src={currentUser.avatar}
//                             alt="Avatar"
//                             width={36}
//                             height={36}
//                             className="rounded-full border-2 border-white/50"
//                           />
//                           <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-pulse" />
//                         </div>
//                       ) : (
//                         <div className="relative w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white border-2 border-white/50 text-sm">
//                           {currentUser.name[0].toUpperCase()}
//                         </div>
//                       )}
//                       <span className="text-white text-sm font-medium">{currentUser.name}</span>
//                       <svg className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </button>

//                     <AnimatePresence>
//                       {isProfileOpen && (
//                         <motion.div 
//                           initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute right-0 mt-2 w-56 bg-black/80 backdrop-blur-md rounded-xl shadow-lg py-2 border border-white/10 overflow-hidden"
//                         >
//                           <div className="px-4 py-3 border-b border-white/10">
//                             <p className="text-sm text-white font-medium">{currentUser.name}</p>
//                             <p className="text-xs text-white/70 truncate">{currentUser.email}</p>
//                           </div>
                          
//                           <Link href="/dashboard">
//                             <div className="flex items-center px-4 py-2 hover:bg-white/10 text-sm text-white transition-colors duration-200">
//                               <svg className="w-4 h-4 mr-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                               </svg>
//                               Dashboard
//                             </div>
//                           </Link>
                          
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center px-4 py-2 hover:bg-white/10 text-sm text-white w-full text-left transition-colors duration-200"
//                           >
//                             <svg className="w-4 h-4 mr-3 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                             </svg>
//                             Sign out
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ) : (
//                   <div>
//                     <Link href="/auth" className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium transition-all hover:from-purple-700 hover:to-pink-700">
//                       <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                       Login
//                     </Link>
//                   </div>
//                 )}
//               </div>
              
//               {/* Mobile Menu Button */}
//               <button 
//                 onClick={() => setIsOpen(!isOpen)} 
//                 className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-50"
//                 aria-label="Toggle menu"
//               >
//                 <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                   {isOpen ? (
//                     <path d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <div 
//             ref={mobileMenuRef}
//             className="lg:hidden fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-black/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out"
//             style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
//           >
//             <div className="flex flex-col h-full">
//               {/* Mobile Menu Header */}
//               <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
//                 <Link href="/" onClick={() => setIsOpen(false)}>
//                   <img 
//                     src="/logo.png" 
//                     alt="Logo" 
//                     className="h-8 transition-transform duration-200" 
//                   />
//                 </Link>
//                 <button 
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 text-white hover:bg-white/10 rounded-full"
//                 >
//                   <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
              
//               {/* User Profile Section */}
//               {currentUser && (
//                 <div className="px-6 py-4 border-b border-white/10 flex items-center space-x-4">
//                   {currentUser.avatar ? (
//                     <Image
//                       src={currentUser.avatar}
//                       alt="Avatar"
//                       width={48}
//                       height={48}
//                       className="rounded-full border-2 border-white/50"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white border-2 border-white/50 text-xl">
//                       {currentUser.name[0].toUpperCase()}
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-white font-medium">{currentUser.name}</h3>
//                     <p className="text-white/70 text-sm truncate">{currentUser.email}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Links */}
//               <div className="flex-1 overflow-y-auto px-6 py-8">
//                 <nav className="flex flex-col space-y-6">
//                   {navLinks.map((link) => (
//                     <div key={link.href}>
//                       <Link 
//                         href={link.href}
//                         onClick={() => setIsOpen(false)}
//                         className={`group flex items-center text-lg transition-colors duration-200 ${pathname === link.href ? 'text-purple-300' : 'text-white hover:text-purple-300'}`}
//                       >
//                         <span className="relative overflow-hidden">
//                           {link.label}
//                           <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
//                         </span>
//                       </Link>
//                     </div>
//                   ))}
//                 </nav>
//               </div>
              
//               {/* Auth Section */}
//               <div className="border-t border-white/10 px-6 py-4">
//                 {currentUser ? (
//                   <div className="space-y-4">
//                     <Link 
//                       href="/dashboard" 
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
//                     >
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                       </svg>
//                       <span>Dashboard</span>
//                     </Link>
                    
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center space-x-2 text-white hover:text-pink-300 transition-colors duration-200 w-full"
//                     >
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       <span>Sign out</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <Link 
//                     href="/auth" 
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-3 px-4 w-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
//                   >
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                     </svg>
//                     <span>Login</span>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // Reusable NavLink component
// const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => {
//   return (
//     <Link href={href} className="relative group p-3">
//       <span className={`text-sm font-medium transition-colors duration-200 ${isActive ? 'text-purple-300' : 'text-white'}`}>
//         {children}
//       </span>
//       <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
//     </Link>
//   );
// };

// export default Navbar;
'use client';
import React, { useEffect, useState, useRef } from "react";
import { account, databases } from '@/lib/appwrite'; 
import { Query } from 'appwrite';
import { cn } from "@/components/utils/cn";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside of profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const promise = account.get();
        promise.then(
          async (response) => {
            const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
            const collectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';
            
            const userDocs = await databases.listDocuments(
              databaseId,
              collectionId,
              [Query.equal('userId', response.$id)]
            );
  
            if (userDocs.documents.length > 0) {
              const user = userDocs.documents[0];
              setCurrentUser({
                name: user.name,
                email: user.email,
                avatar: user.avatar
              });
            }
          },
          () => setCurrentUser(null)
        );
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setCurrentUser(null);
      }
    };
  
    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      setCurrentUser(null);
      router.push("/");
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      setCurrentUser(null);
      setIsProfileOpen(false);
    }
  };

  // Scroll handler with debouncing
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY + 10 && currentScrollY > 100) {
            setVisible(false);
          } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 10) {
            setVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle navigation and close mobile menu
  const handleNavigation = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  // Navigation links array with active state detection
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/form", label: "Search" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      {/* Main Navbar Container */}
      <motion.div 
        ref={navbarRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10",
          "transition-all duration-300 ease-in-out",
          className
        )}
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Navbar content */}
        <div className="w-full backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between items-center w-full h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 z-10">
                <motion.div 
                  className="w-auto h-8 md:h-10"
                  whileTap={{ scale: 0.97 }}
                >
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="h-full w-auto" 
                  />
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center justify-center space-x-1 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.href} 
                    href={link.href} 
                    isActive={pathname === link.href}
                    onClick={() => handleNavigation(link.href)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Desktop Profile/Auth Section */}
              <div className="hidden md:flex items-center space-x-4" ref={profileRef}>
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 focus:outline-none p-2 rounded-full transition-all duration-200"
                    >
                      {currentUser.avatar ? (
                        <div className="relative w-9 h-9 overflow-hidden rounded-full">
                          <Image
                            src={currentUser.avatar}
                            alt="Avatar"
                            width={36}
                            height={36}
                            className="rounded-full border border-white/20"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center text-white border border-white/20 text-sm font-medium">
                          <span>{currentUser.name[0].toUpperCase()}</span>
                        </div>
                      )}
                      <span className="text-white font-medium">{currentUser.name}</span>
                      <motion.svg 
                        animate={{ rotate: isProfileOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4 text-white/70" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-64 bg-slate-900 rounded-xl shadow-lg py-2 border border-white/10"
                        >
                          <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-white font-medium">{currentUser.name}</p>
                            <p className="text-white/70 text-xs truncate">{currentUser.email}</p>
                          </div>
                          
                          <Link href="/dashboard">
                            <div className="flex items-center px-4 py-3 hover:text-blue-400 text-white">
                              <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <span className="font-medium">Dashboard</span>
                            </div>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-3 hover:text-red-400 text-white w-full text-left"
                          >
                            <svg className="w-5 h-5 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">Sign out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href="/auth" className="inline-flex items-center px-6 py-2 rounded-full text-white border border-white/20 hover:border-white/50 transition-colors duration-300">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden text-white p-2 rounded-lg transition-colors z-50"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="md:hidden fixed inset-y-0 right-0 w-full max-w-sm z-50 bg-slate-900 shadow-lg"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <img src="/logo.png" alt="Logo" className="h-8" />
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white"
                >
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* User Profile Section */}
              {currentUser && (
                <div className="px-6 py-4 border-b border-white/10 flex items-center space-x-4">
                  {currentUser.avatar ? (
                    <div className="overflow-hidden rounded-full">
                      <Image
                        src={currentUser.avatar}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="rounded-full border border-white/20"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white border border-white/20 text-xl font-medium">
                      <span>{currentUser.name[0].toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-medium">{currentUser.name}</h3>
                    <p className="text-white/70 text-sm truncate">{currentUser.email}</p>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavigation(link.href)}
                      className={cn(
                        "text-lg transition-colors py-2 border-b border-transparent",
                        pathname === link.href 
                          ? "text-blue-400 border-b border-blue-400" 
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* Auth Section */}
              <div className="border-t border-white/10 px-6 py-6">
                {currentUser ? (
                  <div className="space-y-5">
                    <Link 
                      href="/dashboard" 
                      onClick={() => handleNavigation("/dashboard")}
                      className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors py-2"
                    >
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 text-white hover:text-red-400 transition-colors w-full py-2"
                    >
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Sign out</span>
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth" 
                    onClick={() => handleNavigation("/auth")}
                    className="flex items-center justify-center space-x-2 border border-white/20 text-white rounded-lg py-3 px-4 w-full hover:border-white/50 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Clean NavLink component with underline indicator only
const NavLink = ({ 
  href, 
  children, 
  isActive,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <Link href={href} onClick={onClick}>
      <div className="relative px-4 py-2 group">
        <span className={cn(
          "relative z-10 font-medium transition-colors duration-200",
          isActive ? "text-blue-400" : "text-white/80 group-hover:text-white"
        )}>
          {children}
        </span>
        
        {/* Underline indicator - active state */}
        <span className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ease-out",
          isActive 
            ? "bg-blue-400 scale-x-100 origin-left" 
            : "bg-white/50 scale-x-0 origin-left group-hover:scale-x-100"
        )}></span>
      </div>
    </Link>
  );
};

export default Navbar;