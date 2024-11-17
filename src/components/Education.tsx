import { useInView } from '@/hooks/useInView';

export const Education = () => {
  const [sectionRef, isSectionInView] = useInView({
    threshold: 0.2,
    rootMargin: '50px 0px',
  });

  return (
    <section id="education" className="py-16 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold text-gray-900 mb-8"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out',
          }}
        >
          Education
        </h2>
        <div
          className="bg-gray-50 p-6 rounded-lg relative overflow-hidden group"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView
              ? 'translateY(0) scale(1)'
              : 'translateY(20px) scale(0.95)',
            transition: 'all 700ms ease-out 200ms',
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                'linear-gradient(120deg, rgba(99, 102, 241, 0.03), rgba(99, 102, 241, 0))',
            }}
          />

          <h3
            className="text-xl font-semibold text-gray-900"
            style={{
              opacity: isSectionInView ? 1 : 0,
              transform: isSectionInView
                ? 'translateX(0)'
                : 'translateX(-20px)',
              transition: 'all 700ms ease-out 400ms',
            }}
          >
            B.Tech. in Computer Science and Engineering
          </h3>
          <p
            className="text-gray-600 mt-1"
            style={{
              opacity: isSectionInView ? 1 : 0,
              transform: isSectionInView
                ? 'translateX(0)'
                : 'translateX(-20px)',
              transition: 'all 700ms ease-out 500ms',
            }}
          >
            SRM University
          </p>
          <p
            className="text-gray-500 mt-1"
            style={{
              opacity: isSectionInView ? 1 : 0,
              transform: isSectionInView
                ? 'translateX(0)'
                : 'translateX(-20px)',
              transition: 'all 700ms ease-out 600ms',
            }}
          >
            July 2017 - June 2021
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;
