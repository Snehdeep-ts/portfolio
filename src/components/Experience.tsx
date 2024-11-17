import React from 'react';
import { Calendar, Link, Linkedin } from 'lucide-react';
import { experiences } from '@/data';
import { useInView } from '@/hooks/useInView';

// Extracted ExperienceCard component
const ExperienceCard = ({
  exp,
}: {
  exp: {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    companyUrl: string;
    linkedinUrl: string;
  };
}) => {
  const [cardRef, isCardInView] = useInView({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  return (
    <div
      ref={cardRef}
      className={`relative transform transition-all duration-700 ease-out ${
        isCardInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      {/* Timeline Dot */}
      <div
        className={`absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-600 border-4 border-background transition-all duration-500 delay-300 ${
          isCardInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ zIndex: 2 }}
      />

      {/* Date Bubble */}
      <div
        className={`absolute -left-28 top-7 flex items-center gap-2 text-sm text-foreground/60 transition-all duration-500 delay-200 ${
          isCardInView
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-4'
        }`}
      >
        <Calendar className="h-4 w-4" />
        <span className="font-medium whitespace-nowrap">
          {exp.period.split('-')[0]}
        </span>
      </div>

      {/* Experience Card */}
      <div
        className="ml-8 relative group cursor-pointer"
        onClick={() =>
          window.open(exp.companyUrl, '_blank', 'noopener,noreferrer')
        }
      >
        <div className="bg-card border border-border p-6 rounded-lg relative shadow-sm transition-all duration-150 hover:scale-[1.02] hover:shadow-md">
          {/* Triangle Pointer */}
          <div
            className="absolute -left-2 top-7 w-4 h-4 rotate-45 border-l border-b border-border bg-card"
            style={{ zIndex: 1 }}
          />

          <div
            className="flex items-start justify-between relative"
            style={{ zIndex: 2 }}
          >
            <div className="space-y-1">
              <h3 className="relative text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                {exp.company}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-150 ease-out" />
                <Link className="inline-block h-4 w-4 ml-2 text-primary align-baseline" />
              </h3>
              <p className="text-foreground/60 font-medium">{exp.role}</p>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <span>{exp.period}</span>
                <span>•</span>
                <span>{exp.location}</span>
              </div>
            </div>

            <a
              href={exp.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors p-2 hover:bg-foreground/5 rounded-full relative z-10"
              title={`${exp.company} LinkedIn`}
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <p className="mt-4 text-foreground/80 leading-relaxed">
            {exp.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [timelineRef, timelineInView] = useInView({
    threshold: 0.2,
    rootMargin: '-50px 0px',
  });

  return (
    <section id="experience" className="py-16 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12">Experience</h2>
        <div className="relative" ref={timelineRef}>
          {/* Animated Vertical Timeline Line */}
          <div
            className="absolute left-0 top-0 h-full w-1 bg-slate-200 dark:bg-slate-800 origin-top transition-transform duration-1000"
            style={{
              zIndex: 1,
              transform: `scaleY(${timelineInView ? 1 : 0})`,
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
