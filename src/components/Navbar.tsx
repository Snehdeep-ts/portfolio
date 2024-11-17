import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(true);
  let activityTimer: ReturnType<typeof setTimeout>;

  const sections = [
    'Home',
    'About',
    'Experience',
    'Projects',
    'Skills',
    'Casual-About',
    'Education',
  ];

  useEffect(() => {
    if (document.body.style) {
      document.body.setAttribute(
        'style',
        `
        overflow: overlay;
        -ms-overflow-style: none;
        scrollbar-width: none;
      `
      );
    }

    const handleScroll = () => {
      handleActivity();

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.toLowerCase());
      }
    };

    const handleActivity = () => {
      setIsActive(true);
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        if (!isHovering) {
          setIsActive(false);
        }
      }, 1000);
    };

    const handleMouseMove = () => {
      handleActivity();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.setAttribute('style', '');
      clearTimeout(activityTimer);
    };
  }, [sections, isHovering]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`
        fixed right-0 top-1/2 -translate-y-1/2 h-[80vh] z-[100] 
        transition-all duration-500 ease-in-out
        ${isActive || isHovering ? 'w-64' : 'w-16'}
      `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-full flex items-center">
        {/* Labels */}
        <div className="absolute right-0 h-full flex flex-col justify-between py-4">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`
                group flex items-center justify-end w-48 pr-12 py-3
                relative transition-all duration-300 ease-in-out
                hover:pr-8
              `}
            >
              <span
                className={`
                  relative z-10 transition-all duration-500 ease-in-out
                  tracking-wide
                  ${
                    activeSection === section.toLowerCase()
                      ? isActive
                        ? 'text-[#4169E1] text-2xl translate-x-0 opacity-100'
                        : 'text-gray-300 text-base translate-x-0 opacity-70'
                      : isHovering
                      ? 'text-gray-300 text-sm translate-x-0 opacity-80'
                      : 'text-gray-300 text-sm translate-x-8 opacity-0'
                  }
                  group-hover:opacity-100
                `}
                style={{
                  fontFamily: '"Kumar One", system-ui',
                  WebkitFontSmoothing: 'antialiased',
                  WebkitTextStroke:
                    activeSection === section.toLowerCase() && isActive
                      ? '0.2px rgba(65, 105, 225, 0.3)'
                      : '0.1px rgba(255, 255, 255, 0.3)',
                }}
              >
                {section}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kumar+One&display=swap');

        ::-webkit-scrollbar {
          display: none;
        }
        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
