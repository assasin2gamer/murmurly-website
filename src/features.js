import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Share2, 
  LineChart, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Code 
} from 'lucide-react';
import Nav from './nav';
import logo from './logo.png';
import './features.css';

export default function Features() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featureList = [
    {
      icon: <Database className="feat-icon-blue" />,
      title: "Data Connectors",
      description: "Seamlessly stream from S3 buckets, Bloomberg terminals, or proprietary SQL clusters with automated schema detection.",
      tags: ["S3", "API", "SQL"]
    },
    {
      icon: <Cpu className="feat-icon-green" />,
      title: "Modular Engines",
      description: "Build logic blocks for Ridge Regression, Monte Carlo simulations, or Stochastic paths without writing boilerplate code.",
      tags: ["ML", "Stats", "Python"]
    },
    {
      icon: <Share2 className="feat-icon-purple" />,
      title: "Node Architecture",
      description: "A visual blueprint system where every model is a graph. Trace every input back to its raw source for 100% auditability.",
      tags: ["Visual", "Traceable"]
    },
    {
      icon: <Zap className="feat-icon-yellow" />,
      title: "Agentic Execution",
      description: "Deploy AI agents into your live strategy meetings to perform real-time tool calls and document modeling assumptions.",
      tags: ["AI Agents", "Tools"]
    },
    {
      icon: <LineChart className="feat-icon-blue" />,
      title: "Live Visualizers",
      description: "Instantaneous plotting and dashboard generation. Watch your model's sensitivity change as data streams in.",
      tags: ["Real-time", "Charts"]
    },
    {
      icon: <ShieldCheck className="feat-icon-green" />,
      title: "Institutional Rigor",
      description: "Automated backtesting and stress-testing modules designed for compliance and institutional-grade risk management.",
      tags: ["Backtest", "Risk"]
    }
  ];

  return (
    <div className="features-root">
      <Nav logo={logo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <div className="features-grid-overlay" />

      {/* Hero Section */}
      <section className="features-hero">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="features-tag"
        >
          CAPABILITIES vbeta.1
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          The Engine of <span>Intelligence.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Modular components designed to turn raw financial data into 
          traceable, defensible, and automated logic.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="features-grid-section">
        <div className="features-container">
          {featureList.map((feat, i) => (
            <motion.div 
              key={i}
              className="feature-node-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="node-card-header">
                <div className="node-dot" />
                <span className="node-id">MODULE_0{i + 1}</span>
              </div>
              <div className="node-card-body">
                <div className="icon-box">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
                <div className="node-tags">
                  {feat.tags.map(tag => <span key={tag}>#{tag}</span>)}
                </div>
              </div>
              <div className="node-card-footer">
                <Layers size={14} /> <span>Ready for Deployment</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integration Section */}
      <section className="features-integration">
        <div className="integration-content">
          <Code size={40} color="#00ffcc" />
          <h2>Designed for Developers & Analysts</h2>
          <p>Extend Murmurly with our Python SDK or export your node logic as a standalone API endpoint in one click.</p>
          <div className="integration-stats">
            <div className="stat"><strong>99.9%</strong><span>Uptime</span></div>
            <div className="stat"><strong>&lt;50ms</strong><span>Latency</span></div>
            <div className="stat"><strong>E2E</strong><span>Encryption</span></div>
          </div>
        </div>
      </section>

      <footer className="features-bottom-cta">
        <p>Ready to build your first engine?</p>
        <button className="features-btn">Request Access</button>
      </footer>
    </div>
  );
}