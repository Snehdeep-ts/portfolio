import { useInView } from '@/hooks/useInView';
import { FileText } from 'lucide-react';

const AnimatedListItem = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const [ref, isInView] = useInView({
    threshold: 0.2,
    rootMargin: '50px 0px',
  });

  return (
    <li
      ref={ref}
      className="list-disc list-inside text-gray-600"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
        transition: `all 700ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </li>
  );
};

export const About = () => {
  const [sectionRef, isSectionInView] = useInView({
    threshold: 0.2,
    rootMargin: '50px 0px',
  });

  return (
    <section
      className="py-16 bg-white relative overflow-hidden"
      ref={sectionRef}
      id="about"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
          backgroundSize: '48px 48px',
          opacity: isSectionInView ? 0.05 : 0,
          transition: 'opacity 1000ms ease-out',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold text-gray-900 mb-8 relative"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out',
          }}
        >
          The Story So Far
        </h2>

        <p
          className="text-lg text-gray-600"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out 200ms',
          }}
        >
          I&apos;m a software architect who believes in crafting digital
          experiences that make a difference. My journey spans from writing
          elegant algorithms to orchestrating enterprise solutions, always with
          an eye for both technical excellence and business impact. When
          I&apos;m not architecting systems, you&apos;ll find me mentoring
          fellow developers or exploring the latest in tech innovation.
        </p>

        <div
          className="mt-8"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out 300ms',
          }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            What Drives Me:
          </h3>
          <ul className="space-y-3">
            <AnimatedListItem delay={400}>
              Building systems that scale with elegance and perform with
              precision
            </AnimatedListItem>
            <AnimatedListItem delay={500}>
              Transforming complex business challenges into intuitive technical
              solutions
            </AnimatedListItem>
            <AnimatedListItem delay={600}>
              Leading teams that don&apos;t just write code, but craft
              experiences
            </AnimatedListItem>
            <AnimatedListItem delay={700}>
              Sharing knowledge and elevating the entire team&apos;s technical
              artistry
            </AnimatedListItem>
            <AnimatedListItem delay={800}>
              Creating software that makes users forget they&apos;re using
              software
            </AnimatedListItem>
          </ul>
        </div>

        <div
          className="mt-8 text-lg text-gray-600"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out 900ms',
          }}
        >
          <p>
            Whether it&apos;s optimizing database queries or designing system
            architectures, I believe in the perfect balance of innovation and
            reliability. Every line of code is an opportunity to make the
            digital world a bit more elegant, a bit more efficient, and a lot
            more impactful.
          </p>
        </div>

        <div
          className="mt-12 pt-8 border-t border-gray-100"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out 1000ms',
          }}
        >
          <p className="text-gray-600 flex items-center gap-2">
            For a more formal introduction, check out my résumé:
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              <FileText className="w-4 h-4" />
              <span className="relative">
                View Résumé
                <span className="absolute left-0 right-0 bottom-0 h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
