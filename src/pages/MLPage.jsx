import { useRouter } from '../RouterContext';
import './AppDevPage.css';
import './MLPage.css';

const models = [
  {
    id: 'transformers',
    name: 'Transformers',
    icon: '⚡',
    accent: '#000000',
    arch: 'Self-Attention · Multi-Head · Encoder-Decoder',
    desc: "We've fine-tuned BERT, GPT and T5 variants for NLP tasks including sentiment analysis, entity extraction, Q&A, and code generation at production scale.",
    useCases: ['Text Classification', 'Summarisation', 'Code Generation', 'Question Answering'],
    metrics: [['94%', 'F1 Score'], ['12M', 'Tokens/day'], ['<40ms', 'Inference']],
  },
  {
    id: 'lstm',
    name: 'LSTM Networks',
    icon: '🔁',
    accent: '#7dd3fc',
    arch: 'Bidirectional · Stacked · Attention-augmented',
    desc: 'Long Short-Term Memory networks trained for time series forecasting, stock prediction, anomaly detection and sequential recommendation systems.',
    useCases: ['Time Series Forecasting', 'Anomaly Detection', 'Speech Recognition', 'Recommendation'],
    metrics: [['91%', 'Forecast Accuracy'], ['6M', 'Seq/day'], ['±2%', 'MAPE'],],
  },
  {
    id: 'cnn',
    name: 'CNN Models',
    icon: '🖼️',
    accent: '#fda4af',
    arch: 'ResNet · EfficientNet · Custom Conv Stacks',
    desc: 'Convolutional neural networks for image classification, real-time object detection, medical imaging diagnosis and visual quality inspection.',
    useCases: ['Image Classification', 'Object Detection', 'Medical Imaging', 'Quality Control'],
    metrics: [['98.2%', 'Top-1 Acc'], ['60fps', 'Real-time Det.'], ['0.94', 'AUC-ROC']],
  },
  {
    id: 'nn',
    name: 'Deep Neural Networks',
    icon: '🧠',
    accent: '#fde047',
    arch: 'MLP · Residual · Attention · Custom',
    desc: 'Deep feedforward and residual networks for tabular prediction, fraud detection, personalisation and regression problems across industries.',
    useCases: ['Fraud Detection', 'Price Prediction', 'Customer Churn', 'Personalisation'],
    metrics: [['89%', 'Precision'], ['2ms', 'Latency'], ['4× ROI', 'on avg.']],
  },
];

export default function MLPage() {
  const { navigate } = useRouter();

  return (
    <div className="ml-root">
      {/* Back bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button className="page-back-cta" onClick={() => navigate('')}>Get Started</button>
      </div>

      {/* Hero */}
      <div className="ml-hero">
        <span className="ml-eyebrow">ML Training Portfolio</span>
        <h1 className="ml-title">
          Intelligence we've<br /><span className="ml-glow">engineered from scratch.</span>
        </h1>
        <p className="ml-sub">
          Custom model training across Transformers, LSTM, CNN and Deep Neural Networks — solving real business problems with AI.
        </p>
      </div>

      {/* Neural net animation banner */}
      <div className="ml-network-banner">
        <NetworkViz />
      </div>

      {/* Model cards */}
      <div className="ml-models">
        {models.map((m) => (
          <div key={m.id} className="ml-model-card" style={{ '--accent': m.accent }}>
            <div className="ml-model-header">
              <div className="ml-model-icon" style={{ background: `${m.accent}15` }}>{m.icon}</div>
              <div>
                <h2 className="ml-model-name">{m.name}</h2>
                <span className="ml-model-arch">{m.arch}</span>
              </div>
            </div>
            <p className="ml-model-desc">{m.desc}</p>
            <div className="ml-use-cases">
              {m.useCases.map(u => <span key={u} className="ml-uc-tag">{u}</span>)}
            </div>
            <div className="ml-metrics">
              {m.metrics.map(([v, l]) => (
                <div key={l} className="ml-metric">
                  <span className="ml-metric-val">{v}</span>
                  <span className="ml-metric-lbl">{l}</span>
                </div>
              ))}
            </div>
            <div className="ml-accent-bar" style={{ background: m.accent }} />
          </div>
        ))}
      </div>

      {/* Projects showcase */}
      <div className="ml-projects">
        <h2 className="ml-proj-heading">Projects we've shipped</h2>
        <div className="ml-proj-grid">
          {[
            ['Fintech Fraud Engine', 'Transformer-based detection model — catches 99.4% of fraudulent transactions with <0.1% false positive rate.', 'Transformers'],
            ['Medical Image Classifier', 'CNN model for retinal disease detection achieving specialist-level accuracy across 8 conditions.', 'CNN'],
            ['Demand Forecaster', 'LSTM stack for an e-commerce giant — 91% MAPE improvement over statistical baselines.', 'LSTM'],
            ['Recommendation System', 'Deep NN personalisation engine serving 4M+ users — increased session duration by 38%.', 'Deep Neural Nets'],
            ['NLP Pipeline', 'BERT fine-tune for legal document parsing — auto-extracts key clauses in <200ms per document.', 'BERT / Transformers'],
            ['Computer Vision QA', 'EfficientNet-based defect detection in manufacturing — replaces human inspection with 98.2% accuracy.', 'CNN'],
          ].map(([title, desc, tag]) => (
            <div key={title} className="ml-proj-card">
              <div className="ml-proj-img" />
              <div className="ml-proj-body">
                <span className="ml-proj-tag">{tag}</span>
                <h3 className="ml-proj-title">{title}</h3>
                <p className="ml-proj-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Animated neural network visualisation */
function NetworkViz() {
  const layers = [3, 5, 5, 3];
  return (
    <svg className="ml-nn-svg" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {layers.map((count, li) => {
        const x = 80 + li * 150;
        return Array.from({ length: count }, (_, ni) => {
          const y = 90 - ((count - 1) * 30) / 2 + ni * 30;
          return (
            <g key={`${li}-${ni}`}>
              {/* connections to next layer */}
              {li < layers.length - 1 && Array.from({ length: layers[li + 1] }, (_, nj) => {
                const nx = x + 150;
                const ny = 90 - ((layers[li + 1] - 1) * 30) / 2 + nj * 30;
                return (
                  <line
                    key={nj}
                    x1={x} y1={y} x2={nx} y2={ny}
                    stroke="rgba(163,116,255,0.12)" strokeWidth="1"
                    className={`nn-line nn-line-${li}-${ni}-${nj}`}
                  />
                );
              })}
              {/* node */}
              <circle cx={x} cy={y} r="10" fill="rgba(163,116,255,0.15)" stroke="rgba(163,116,255,0.5)" strokeWidth="1.5">
                <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.5 + (li + ni) * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="9;11;9" dur={`${1.5 + (li + ni) * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        });
      })}
      <text x="80"  y="165" fill="rgba(0, 0, 0,0.3)" fontSize="10" textAnchor="middle" fontFamily="Syne">Input</text>
      <text x="230" y="165" fill="rgba(0, 0, 0,0.3)" fontSize="10" textAnchor="middle" fontFamily="Syne">Hidden</text>
      <text x="380" y="165" fill="rgba(0, 0, 0,0.3)" fontSize="10" textAnchor="middle" fontFamily="Syne">Hidden</text>
      <text x="530" y="165" fill="rgba(0, 0, 0,0.3)" fontSize="10" textAnchor="middle" fontFamily="Syne">Output</text>
    </svg>
  );
}
