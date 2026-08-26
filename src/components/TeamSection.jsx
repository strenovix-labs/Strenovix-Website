import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TEAM = [
  { photo: '/team/member-1.jpg', name: '', role: '' },
  { photo: '/team/member-2.jpg', name: '', role: '' },
  { photo: '/team/member-3.jpg', name: '', role: '' },
  { photo: '/team/member-4.jpg', name: '', role: '' },
  { photo: '/team/member-5.jpg', name: '', role: '' },
  { photo: '/team/member-6.jpg', name: '', role: '' },
];

function TeamCard({ member, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#F5F5EE] rounded-2xl p-6 md:p-7 group border border-black/15"
    >
      {/* Photo */}
      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-[#F5F5EE]">
        <img
          src={member.photo}
          alt={member.name || 'Team member'}
          className="w-full h-full object-cover object-top grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="text-black font-medium text-base mb-1 min-h-[1.25rem]">
        {member.name || <span className="text-gray-600">Name coming soon</span>}
      </h3>
      <p className="text-black/70 text-xs min-h-[1rem]">
        {member.role || <span className="text-gray-700">Role coming soon</span>}
      </p>
    </motion.div>
  );
}

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-transparent py-24 px-4 md:px-8" id="team">
      <div className="max-w-7xl mx-auto">

        <motion.div
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-black/60 text-[10px] sm:text-xs tracking-widest uppercase block mb-4">
            The Collective
          </span>
          <h2
            className="font-medium leading-none tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#000000' }}
          >
            Minds behind<br />the magic.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {TEAM.map((member, i) => (
            <TeamCard key={member.photo} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
