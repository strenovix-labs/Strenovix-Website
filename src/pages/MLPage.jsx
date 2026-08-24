import { useState } from 'react';
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
            {
              title: 'GNSS Error Prediction Engine',
              desc: 'Stacks LightGBM with deep learning models to predict satellite orbit and clock errors ahead of time (ISRO collaboration).',
              tag: 'Deep Learning',
              image: '/projects/gnss.jpg'
            },
            {
              title: 'DocRift',
              desc: 'A team of specialized LangGraph agents that reads a codebase to find documentation drift, powered by Gemini AI.',
              tag: 'AI Agents',
              image: '/projects/docrift.jpg'
            },
            {
              title: 'Face Recog Admission',
              desc: 'A real-time computer vision pipeline running in active departmental use, using InsightFace and a FastAPI backend.',
              tag: 'Computer Vision',
              image: '/projects/face-attendance.jpg'
            },
            {
              title: 'Meiyo',
              desc: 'An image forensics tool built to detect manipulated and AI-generated photos using Error Level Analysis with 93% accuracy.',
              tag: 'Image Forensics',
              image: '/projects/meiyo.jpg'
            },
            {
              title: 'Medical RAG',
              desc: 'An AI medical assistant built on a Retrieval-Augmented Generation pipeline grounded in medical literature via FAISS.',
              tag: 'RAG / LLMs',
              image: '/projects/medical-rag.jpg'
            }
          ].map((proj) => (
            <div key={proj.title} className="ml-proj-card">
              <div 
                className="ml-proj-img" 
                style={proj.image ? { backgroundImage: `url(${proj.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
              <div className="ml-proj-body">
                <span className="ml-proj-tag">{proj.tag}</span>
                <h3 className="ml-proj-title">{proj.title}</h3>
                <p className="ml-proj-desc">{proj.desc}</p>
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
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <svg className="ml-nn-svg" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {layers.map((count, li) => {
        const x = 80 + li * 150;
        return Array.from({ length: count }, (_, ni) => {
          const y = 90 - ((count - 1) * 30) / 2 + ni * 30;
          const isNodeHovered = hoveredNode !== null && hoveredNode.li === li && hoveredNode.ni === ni;

          return (
            <g 
              key={`${li}-${ni}`}
              onMouseEnter={() => setHoveredNode({ li, ni })}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* connections to next layer */}
              {li < layers.length - 1 && Array.from({ length: layers[li + 1] }, (_, nj) => {
                const nx = x + 150;
                const ny = 90 - ((layers[li + 1] - 1) * 30) / 2 + nj * 30;
                
                const isLineActive = hoveredNode !== null && (
                  (hoveredNode.li === li && hoveredNode.ni === ni) ||
                  (hoveredNode.li === li + 1 && hoveredNode.ni === nj)
                );

                const strokeColor = isLineActive ? 'rgba(163, 116, 255, 0.7)' : 'rgba(163, 116, 255, 0.12)';
                const strokeWidth = isLineActive ? 2 : 1;
                const pulseColor = isLineActive ? '#ffffff' : '#d8b4fe';
                const pulseRadius = isLineActive ? 2.5 : 1.5;

                // Speed up active lines
                const dur = isLineActive ? '0.6s' : `${1.2 + ((ni + nj) % 4) * 0.4}s`;
                const begin = `${((ni * 3 + nj * 7) % 10) * 0.2}s`;
                
                return (
                  <g key={nj}>
                    <line
                      x1={x} y1={y} x2={nx} y2={ny}
                      stroke={strokeColor} strokeWidth={strokeWidth}
                      className={`nn-line nn-line-${li}-${ni}-${nj}`}
                      style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                    />
                    {/* Signal pulse */}
                    <circle r={pulseRadius} fill={pulseColor} style={{ transition: 'fill 0.2s, r 0.2s' }}>
                      <animateMotion
                        path={`M ${x} ${y} L ${nx} ${ny}`}
                        dur={dur}
                        repeatCount="indefinite"
                        begin={begin}
                      />
                    </circle>
                  </g>
                );
              })}
              
              {/* Outer pulsing ripple ring */}
              <circle cx={x} cy={y} r="10" fill="none" stroke={isNodeHovered ? 'rgba(163, 116, 255, 0.8)' : 'rgba(163, 116, 255, 0.4)'} strokeWidth="1" style={{ transition: 'stroke 0.2s' }}>
                <animate attributeName="r" values={isNodeHovered ? '10;26' : '10;22'} dur={isNodeHovered ? '1s' : `${2 + ((li + ni) % 3) * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur={isNodeHovered ? '1s' : `${2 + ((li + ni) % 3) * 0.5}s`} repeatCount="indefinite" />
              </circle>

              {/* Node core glow */}
              <circle cx={x} cy={y} r="10" fill={isNodeHovered ? 'rgba(163, 116, 255, 0.3)' : 'rgba(163, 116, 255, 0.12)'} stroke={isNodeHovered ? '#ffffff' : 'rgba(163, 116, 255, 0.6)'} strokeWidth="1" style={{ transition: 'fill 0.2s, stroke 0.2s' }}>
                <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5 + ((li + ni) % 3) * 0.4}s`} repeatCount="indefinite" />
              </circle>

              {/* Inner solid node */}
              <circle cx={x} cy={y} r={isNodeHovered ? 7 : 5} fill={isNodeHovered ? '#ffffff' : '#a374ff'} style={{ transition: 'fill 0.2s, r 0.2s' }} />

              {/* Large invisible hover target for easier mouse interaction */}
              <circle cx={x} cy={y} r="20" fill="transparent" pointerEvents="all" />
            </g>
          );
        });
      })}
      
      {/* Dynamic labels */}
      <text x="80"  y="165" fill="rgba(255, 255, 255, 0.4)" fontSize="10" textAnchor="middle" fontFamily="Syne">Input</text>
      <text x="230" y="165" fill="rgba(255, 255, 255, 0.4)" fontSize="10" textAnchor="middle" fontFamily="Syne">Hidden</text>
      <text x="380" y="165" fill="rgba(255, 255, 255, 0.4)" fontSize="10" textAnchor="middle" fontFamily="Syne">Hidden</text>
      <text x="530" y="165" fill="rgba(255, 255, 255, 0.4)" fontSize="10" textAnchor="middle" fontFamily="Syne">Output</text>
    </svg>
  );
}
