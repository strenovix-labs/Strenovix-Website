import ChromaGrid from './ChromaGrid';
import './Founders.css';

const teamItems = [
  {
    image: 'https://i.pravatar.cc/300?img=33',
    title: 'Aakash Rajan',
    subtitle: 'Co-Founder & CEO',
    handle: '@aakashrajan',
    borderColor: '#000000',
    gradient: 'linear-gradient(145deg, #6c3fd4 0%, #060608 80%)',
    url: '#',
  },
  {
    image: 'https://i.pravatar.cc/300?img=47',
    title: 'Sneha Verma',
    subtitle: 'Co-Founder & CTO',
    handle: '@snehaverma',
    borderColor: '#333333',
    gradient: 'linear-gradient(145deg, #d4246c 0%, #060608 80%)',
    url: '#',
  },
  {
    image: 'https://i.pravatar.cc/300?img=12',
    title: 'Rohan Pillai',
    subtitle: 'Head of Design',
    handle: '@rohanpillai',
    borderColor: '#fde047',
    gradient: 'linear-gradient(145deg, #b45309 0%, #060608 80%)',
    url: '#',
  },
  {
    image: 'https://i.pravatar.cc/300?img=55',
    title: 'Arjun Mehta',
    subtitle: 'ML Research Lead',
    handle: '@arjunmehta',
    borderColor: '#7dd3fc',
    gradient: 'linear-gradient(145deg, #0369a1 0%, #060608 80%)',
    url: '#',
  },
  {
    image: 'https://i.pravatar.cc/300?img=23',
    title: 'Divya Krishnan',
    subtitle: 'Full-Stack Engineer',
    handle: '@divyakrishnan',
    borderColor: '#10B981',
    gradient: 'linear-gradient(145deg, #065f46 0%, #060608 80%)',
    url: '#',
  },
  {
    image: 'https://i.pravatar.cc/300?img=60',
    title: 'Priya Nambiar',
    subtitle: 'Head of Marketing',
    handle: '@priyanambiar',
    borderColor: '#f97316',
    gradient: 'linear-gradient(145deg, #9a3412 0%, #060608 80%)',
    url: '#',
  },
];

export default function Founders() {
  return (
    <section className="founders" id="team">
      <div className="founders-inner">
        <div className="founders-head">
          <span className="section-label reveal">The People</span>
          <h2 className="section-heading reveal reveal-delay-1">Meet the Team.</h2>
          <p className="founders-sub reveal reveal-delay-2">
            A small, elite crew obsessed with craft — building products that define the next era of digital business.
          </p>
        </div>

        <div className="founders-chroma reveal reveal-delay-3">
          <ChromaGrid items={teamItems} columns={3} radius={280} />
        </div>
      </div>
    </section>
  );
}
