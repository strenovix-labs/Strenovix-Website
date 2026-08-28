import './Studio.css';

const clients = ['Google', 'Shopify', 'Notion', 'Stripe', 'Linear', 'Vercel', 'Figma', 'Loom'];

export default function Studio() {
  return (
    <section className="studio">
      <div className="studio-inner">
        <span className="section-label reveal">Our Studio</span>
        <h2 className="studio-heading reveal reveal-delay-1">
          To captivate your audience as an<br />
          <span className="glow-text">industry leader.</span>
        </h2>
        <p className="studio-sub reveal reveal-delay-2">
          We are a full-stack digital agency obsessed with craft. Every pixel, interaction and line of code is intentional, built to make your brand impossible to ignore.
        </p>
      </div>

      <div className="clients-bar reveal">
        <span className="section-label" style={{ marginBottom: 0 }}>Clients</span>
        <div className="clients-track-wrap">
          <div className="clients-track">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="client-name">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
