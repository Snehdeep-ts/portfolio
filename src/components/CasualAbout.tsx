import { useInView } from '@/hooks/useInView';
import {
  Car,
  Bike,
  Music,
  Radio,
  Rocket,
  Headphones,
  LucideIcon,
} from 'lucide-react';
import { MeteorShower } from './MeteorShower';

interface InterestCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const InterestCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: InterestCardProps) => {
  const [ref, isInView] = useInView({
    threshold: 0.2,
    rootMargin: '50px 0px',
  });

  return (
    <div
      ref={ref}
      className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 group"
      style={{
        opacity: isInView ? 1 : 0,
        transform: `${isInView ? 'translateY(0)' : 'translateY(20px)'}`,
        transition: `all 700ms ease-out ${delay}ms`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-500/10 rounded-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
          <Icon className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-200 mb-1 group-hover:text-indigo-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const CasualAbout = () => {
  const [sectionRef, isSectionInView] = useInView({
    threshold: 0.2,
  });

  return (
    <section
      id="casual-about"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgb(15 23 42), rgb(23 37 84))',
      }}
      ref={sectionRef}
    >
      <style jsx global>{`
        @keyframes meteorFall {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          60% {
            opacity: 0;
          }
          100% {
            transform: translateX(-250vh) translateY(250vh) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
      `}</style>

      <MeteorShower />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2
          className="text-3xl font-bold text-slate-200 mb-4"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out',
          }}
        >
          Beyond the Code
        </h2>

        <p
          className="text-lg text-slate-400 mb-12"
          style={{
            opacity: isSectionInView ? 1 : 0,
            transform: isSectionInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out 100ms',
          }}
        >
          When I&apos;m not crafting code, you&apos;ll find me exploring tech,
          roads, and rhythms...
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InterestCard
            icon={Car}
            title="Car Enthusiast"
            description="Love being behind the wheel, exploring new routes, and experiencing the thrill of driving. Every journey is an adventure waiting to unfold."
            delay={200}
          />

          <InterestCard
            icon={Bike}
            title="Bike Life"
            description="Two wheels or four, the passion for riding runs deep. There's nothing quite like the freedom of cruising on a bike."
            delay={300}
          />

          <InterestCard
            icon={Music}
            title="Desi Hip Hop"
            description="Passionate about the evolving Desi Hip Hop scene. Love how it blends cultural elements with modern beats and meaningful lyrics."
            delay={400}
          />

          <InterestCard
            icon={Radio}
            title="Podcast Explorer"
            description="Always tuned into tech and innovation podcasts. Love staying updated with the latest trends and deep diving into new concepts."
            delay={500}
          />

          <InterestCard
            icon={Rocket}
            title="Tech Enthusiast"
            description="Constantly exploring technological advancements. From AI to quantum computing, I'm always eager to learn and understand what's next in tech."
            delay={600}
          />

          <InterestCard
            icon={Headphones}
            title="Music on the Go"
            description="Perfect drives are paired with great music. Creating memories on the road with the best beats playing in the background."
            delay={700}
          />
        </div>
      </div>
    </section>
  );
};

export default CasualAbout;
