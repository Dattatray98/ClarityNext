import { useState, useEffect } from 'react';

const FuturisticButtons = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  
  // Pulsing animation effect
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-light text-cyan-100 mb-10 tracking-wider">
          FUTURE INTERFACE CONTROLS
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
          {/* Get Started Button */}
          <button
            className="relative px-8 py-4 text-white text-lg font-medium rounded-2xl transition-all duration-500 group overflow-hidden"
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
            style={{
              background: 'linear-gradient(135deg, #002a29 0%, #087b95 100%)',
              boxShadow: isHovered1 
                ? '0 0 25px rgba(0, 230, 255, 0.7), 0 0 15px rgba(0, 200, 255, 0.4)' 
                : '0 0 15px rgba(0, 200, 255, 0.3)',
              transform: isHovered1 ? 'translateY(-4px)' : 'translateY(0)',
              border: '1px solid rgba(0, 200, 255, 0.3)',
              borderBottom: '3px solid rgba(0, 0, 0, 0.5)',
              borderTop: '1px solid rgba(0, 230, 255, 0.4)'
            }}
          >
            {/* Animated shine effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />
            
            {/* Inner glow */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: 'inset 0 0 12px rgba(0, 230, 255, 0.6)'
              }}
            />
            
            {/* Text with glow effect */}
            <span className="relative z-10 tracking-wider text-cyan-100 drop-shadow-md">
              Get Started
            </span>
            
            {/* Pulse animation ring */}
            <div 
              className={`absolute inset-0 rounded-2xl border-2 border-cyan-500/30 ${
                pulse ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              } transition-all duration-1000`}
            />
          </button>

          {/* Learn More Button */}
          <button
            className="relative px-8 py-4 text-gray-900 text-lg font-medium rounded-2xl transition-all duration-500 group overflow-hidden"
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            style={{
              background: 'linear-gradient(135deg, #cefcfb 0%, #087b95 100%)',
              boxShadow: isHovered2 
                ? '0 0 25px rgba(206, 252, 251, 0.5), 0 0 15px rgba(8, 123, 149, 0.4)' 
                : '0 0 15px rgba(206, 252, 251, 0.3)',
              transform: isHovered2 ? 'translateY(-4px)' : 'translateY(0)',
              border: '1px solid rgba(206, 252, 251, 0.3)',
              borderBottom: '3px solid rgba(0, 0, 0, 0.3)',
              borderTop: '1px solid rgba(206, 252, 251, 0.4)'
            }}
          >
            {/* Animated shine effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />
            
            {/* Inner glow */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: 'inset 0 0 12px rgba(206, 252, 251, 0.6)'
              }}
            />
            
            {/* Text with glow effect */}
            <span className="relative z-10 tracking-wider drop-shadow-md">
              Learn More
            </span>
            
            {/* Pulse animation ring */}
            <div 
              className={`absolute inset-0 rounded-2xl border-2 border-cyan-300/30 ${
                pulse ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              } transition-all duration-1000`}
            />
          </button>
        </div>
        
        <p className="mt-10 text-sm text-cyan-700/80 font-light tracking-wide">
          Hover to experience future interaction
        </p>
      </div>
    </div>
  );
};

export default FuturisticButtons;