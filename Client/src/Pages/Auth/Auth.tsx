// Auth.tsx
import { useParams } from 'react-router-dom';
import Login from './Login.tsx';
import SignUp from './SignUp.tsx';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Auth = () => {
  const { type } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Optimized floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 60 : 150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-800"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.25 }}
        className="relative z-10 w-full max-w-md min-w-[50%]"
      >
        {/* Refined holographic effect */}
        {/* <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-pink-500/20 rounded-xl opacity-80 blur-lg"></div>
         */}
        <div className="relative w-[] border border-gray-300 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden">
          {/* Animated header */}
          <div className="p-4 text-center border-b border-gray-700/30 relative overflow-hidden">
            <div className="absolute -inset-1 bg-blue-300 opacity-60"></div>

            <div className="flex flex-col items-center relative z-10">
              <div className='flex gap-1 cursor-pointer'>
                <FaGraduationCap className="text-[#013778] text-2xl md:text-3xl" />
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#013778] to-[#029097] bg-clip-text text-transparent">
                  PlacementOS
                </h1>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <FaBookOpen className="text-indigo-400/80 text-lg" />
                <p className="text-gray-600 text-sm font-light">
                  {type === 'login' ? 'Continue your skill\'s upgrading journey' : 'Start your skill\'s upgrading journey'}
                </p>
              </div>
            </div>
          </div>

          {/* Auth form container */}
          <div className="py-6  md:py-8 flex justify-center bg-gradient-to-b from-blue-200 to-gray-200">
            {type === 'login' ? <Login /> : <SignUp />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;