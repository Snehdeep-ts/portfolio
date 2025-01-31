import { education } from '@/data';
import { useInView } from '@/hooks/useInView';

export const Education = () => {
  const [sectionRef, isSectionInView] = useInView({
    threshold: 0.2,
    rootMargin: '50px 0px',
  });

  return (
    <section className="py-16 bg-white" ref={sectionRef}>
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

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={`${edu.institution}-${edu.degree}`}
              className="bg-gray-50 p-6 rounded-lg relative overflow-hidden group"
              style={{
                opacity: isSectionInView ? 1 : 0,
                transform: isSectionInView
                  ? 'translateY(0) scale(1)'
                  : 'translateY(20px) scale(0.95)',
                transition: `all 700ms ease-out ${200 + index * 100}ms`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(99, 102, 241, 0.03), rgba(99, 102, 241, 0))',
                }}
              />

              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} Logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {edu.degree}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                    <p className="text-indigo-600 font-medium">
                      {edu.institution}
                    </p>
                    <span className="hidden sm:block text-gray-400">•</span>
                    <p className="text-gray-500">{edu.location}</p>
                  </div>

                  <p className="text-gray-500 mt-1">{edu.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
