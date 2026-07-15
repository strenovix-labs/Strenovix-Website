import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
    items,
    className = '',
    radius = 300,
    columns = 3,
    rows = 2,
    damping = 0.45,
    fadeOut = 0.6,
    ease = 'power3.out'
}) => {
    const rootRef = useRef(null);
    const fadeRef = useRef(null);
    const setX = useRef(null);
    const setY = useRef(null);
    const pos = useRef({ x: 0, y: 0 });

    const defaultItems = [
        {
            image: 'https://i.pravatar.cc/300?img=33',
            title: 'Arjun Menon',
            subtitle: 'Co-Founder & CEO',
            handle: '@arjunmenon',
            borderColor: '#000000',
            gradient: 'linear-gradient(145deg, #6c3fd4 0%, #060608 80%)',
            url: '#'
        },
        {
            image: 'https://i.pravatar.cc/300?img=47',
            title: 'Priya Nair',
            subtitle: 'Co-Founder & CTO',
            handle: '@priyanair',
            borderColor: '#333333',
            gradient: 'linear-gradient(145deg, #d4246c 0%, #060608 80%)',
            url: '#'
        },
        {
            image: 'https://i.pravatar.cc/300?img=12',
            title: 'Karthik Rajan',
            subtitle: 'Head of Engineering',
            handle: '@karthikrajan',
            borderColor: '#10B981',
            gradient: 'linear-gradient(145deg, #10B981 0%, #060608 80%)',
            url: '#'
        },
        {
            image: 'https://i.pravatar.cc/300?img=23',
            title: 'Divya Krishnan',
            subtitle: 'Head of Design',
            handle: '@divyakrishnan',
            borderColor: '#F59E0B',
            gradient: 'linear-gradient(145deg, #F59E0B 0%, #060608 80%)',
            url: '#'
        },
        {
            image: 'https://i.pravatar.cc/300?img=55',
            title: 'Sanjay Pillai',
            subtitle: 'ML Research Lead',
            handle: '@sanjaypillai',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(145deg, #06B6D4 0%, #060608 80%)',
            url: '#'
        },
        {
            image: 'https://i.pravatar.cc/300?img=60',
            title: 'Meena Suresh',
            subtitle: 'Growth & Marketing',
            handle: '@meenasuresh',
            borderColor: '#EF4444',
            gradient: 'linear-gradient(145deg, #EF4444 0%, #060608 80%)',
            url: '#'
        },
    ];

    const data = items?.length ? items : defaultItems;

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        setX.current = gsap.quickSetter(el, '--x', 'px');
        setY.current = gsap.quickSetter(el, '--y', 'px');
        const { width, height } = el.getBoundingClientRect();
        pos.current = { x: width / 2, y: height / 2 };
        setX.current(pos.current.x);
        setY.current(pos.current.y);
    }, []);

    const moveTo = (x, y) => {
        gsap.to(pos.current, {
            x, y,
            duration: damping,
            ease,
            onUpdate: () => { setX.current?.(pos.current.x); setY.current?.(pos.current.y); },
            overwrite: true
        });
    };

    const handleMove = e => {
        const r = rootRef.current.getBoundingClientRect();
        moveTo(e.clientX - r.left, e.clientY - r.top);
        gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    };

    const handleLeave = () => {
        gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
    };

    const handleCardMove = e => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={rootRef}
            className={`chroma-grid ${className}`}
            style={{ '--r': `${radius}px`, '--cols': columns, '--rows': rows }}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            {data.map((c, i) => (
                <article
                    key={i}
                    className="chroma-card"
                    onMouseMove={handleCardMove}
                    onClick={() => c.url && c.url !== '#' && window.open(c.url, '_blank', 'noopener,noreferrer')}
                    style={{ '--card-border': c.borderColor || 'transparent', '--card-gradient': c.gradient, cursor: c.url && c.url !== '#' ? 'pointer' : 'default' }}
                >
                    <div className="chroma-img-wrapper">
                        <img src={c.image} alt={c.title} loading="lazy" />
                    </div>
                    <footer className="chroma-info">
                        <h3 className="name">{c.title}</h3>
                        {c.handle && <span className="handle">{c.handle}</span>}
                        <p className="role">{c.subtitle}</p>
                    </footer>
                </article>
            ))}
            <div className="chroma-overlay" />
            <div ref={fadeRef} className="chroma-fade" />
        </div>
    );
};

export default ChromaGrid;