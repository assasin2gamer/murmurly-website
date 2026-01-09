import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './hiw.css';
import NodePage from './nodepage';
import Nav from './nav';
import MeetingAgent from './meeting';
import logo from './logo.png';
import { useScroll, useTransform } from 'framer-motion';
// --- Configuration & Theme ---
const COLORS = {
  wire: "#4b5563",
  pulse: "#00ffcc",
  nodeBody: "rgba(28, 30, 38, 0.95)",
  nodeHeader: "rgba(45, 51, 63, 1)",
  pin: "#ffcc00",
  accent: "#2563eb"
};

const NODE_W = 220;
const ROW_H = 32;
const HEADER_H = 44;

const NODES = [
  { 
    id: 's3', title: 'S3: Bucket Source', x: 50, y: 150, 
    out: ['raw_csv_stream', 'metadata'] 
  },
  { 
    id: 'clean', title: 'Data Preprocessor', x: 350, y: 100, 
    in: ['raw_csv_stream'], 
    out: ['cleaned_df', 'feature_map'] 
  },
  { 
    id: 'split', title: 'Train/Test Split', x: 350, y: 300, 
    in: ['cleaned_df'], 
    out: ['train_set', 'test_set'] 
  },
  { 
    id: 'reg', title: 'Regression Model', x: 650, y: 150, 
    in: ['train_set', 'feature_map'], 
    out: ['model_weights', 'intercept'] 
  },
  { 
    id: 'eval', title: 'Evaluation Node', x: 950, y: 200, 
    in: ['test_set', 'model_weights'], 
    out: ['R2_Score', 'Predictions'] 
  },
  { 
    id: 'final', title: 'Dashboard Output', x: 1250, y: 220, 
    in: ['R2_Score', 'Predictions'], 
    out: ['DEPLOYED_API'] 
  },
];

// Helper to calculate pin coordinates
const getPinPos = (nodeId, label, side) => {
  const node = NODES.find(n => n.id === nodeId);
  if (!node) return { x: 0, y: 0 };
  const list = side === 'in' ? node.in : node.out;
  const index = list.indexOf(label);
  return {
    x: side === 'in' ? node.x : node.x + NODE_W,
    y: node.y + HEADER_H + (index * ROW_H) + (ROW_H / 2)
  };
};
const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  // [0, 0.05] -> The "Buffer": Stay at 1 opacity until 5% of the page is scrolled
  // [0.05, 0.15] -> The "Fade": Transition from 1 to 0 opacity
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0.8]);

  return (
    <motion.div 
      className="scroll-indicator-wrap"
      style={{ 
        opacity, 
        scale,
        // This ensures the element is removed from pointer-events when invisible
        pointerEvents: useTransform(scrollYProgress, s => s > 0.1 ? 'none' : 'auto') 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="shimmer-text">Scroll to Explore</div>
      <div className="mouse-body">
        {/* ADDED className="mouse-wheel" BELOW - This was why you couldn't see the dot */}
        <motion.div 
          className="mouse-wheel"
          animate={{ y: [0, 12, 0] }} // Added 0 at end for a smooth loop
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
    </motion.div>
  );
};


const Connection = ({ from, to, delay }) => {
  const start = getPinPos(from[0], from[1], 'out');
  const end = getPinPos(to[0], to[1], 'in');
  // Create a nice bezier curve
  const d = `M ${start.x} ${start.y} C ${start.x + 100} ${start.y}, ${end.x - 100} ${end.y}, ${end.x} ${end.y}`;

  return (
    <g>
      <path d={d} fill="none" stroke={COLORS.wire} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <motion.path
        d={d}
        fill="none"
        stroke={COLORS.pulse}
        strokeWidth="2"
        strokeDasharray="10, 30"
        initial={{ strokeDashoffset: 40 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
      />
    </g>
  );
};

const Hiw = () => {
  const [phase, setPhase] = useState('prompt');
  const [text, setText] = useState("");
  const fullText = "import data from s3 and show me age to retention prediction...";

  useEffect(() => {
    let timer;

    if (phase === 'prompt') {
      // RESET text at start of loop
      setText("");
      let i = 0;
      const typingInterval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(typingInterval);
          // Wait 1.5s after typing before showing nodes
          timer = setTimeout(() => setPhase('nodes'), 1500);
        }
      }, 50);
      return () => {
        clearInterval(typingInterval);
        clearTimeout(timer);
      };
    } 
    
    else if (phase === 'nodes') {
      // Wait 5s for the node build animation to finish, then show report
      timer = setTimeout(() => setPhase('report'), 5000);
      return () => clearTimeout(timer);
    } 
    
    else if (phase === 'report') {
      // Show the final report/success for 6s, then loop back to start
      timer = setTimeout(() => setPhase('prompt'), 6000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="how-it-works-page">
     <Nav logo={logo}/>

      <main className="canvas-container">
        <div className="grid-bg" />
        
        <AnimatePresence>
          {phase === 'prompt' && (
            <motion.div 
              className="prompt-wrap"
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            >
              <div className="terminal-window">
                <span className="term-acc">pipeline_gen --task</span>
                <span className="term-text"> "{text}"</span>
                <span className="blinker">_</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          
        <motion.svg
          viewBox="0 0 1550 600"
          className={`node-svg ${phase === 'prompt' ? 'hidden' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {phase !== 'prompt' && (
            <>
              {/* Connections based on ML logic */}
              <Connection from={['s3', 'raw_csv_stream']} to={['clean', 'raw_csv_stream']} delay={0} />
              <Connection from={['clean', 'cleaned_df']} to={['split', 'cleaned_df']} delay={0.5} />
              <Connection from={['clean', 'feature_map']} to={['reg', 'feature_map']} delay={0.8} />
              <Connection from={['split', 'train_set']} to={['reg', 'train_set']} delay={1.2} />
              <Connection from={['reg', 'model_weights']} to={['eval', 'model_weights']} delay={1.8} />
              <Connection from={['split', 'test_set']} to={['eval', 'test_set']} delay={1.5} />
              <Connection from={['eval', 'R2_Score']} to={['final', 'R2_Score']} delay={2.2} />
              <Connection from={['eval', 'Predictions']} to={['final', 'Predictions']} delay={2.5} />

              {NODES.map((node, idx) => {
                const isFinal = node.id === 'final' && phase === 'report';
                const rows = Math.max(node.in?.length || 0, node.out?.length || 0);
                const bodyH = HEADER_H + rows * ROW_H + 10;

                return (
                  <motion.g 
                    key={node.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                  >
                    {/* Node Shadow/Glow */}
                    <rect x={node.x+4} y={node.y+4} width={NODE_W} height={bodyH} rx="8" fill="rgba(0,0,0,0.3)" />
                    
                    {/* Main Body */}
                    <rect 
                      x={node.x} y={node.y} width={NODE_W} height={bodyH} rx="8" 
                      fill={COLORS.nodeBody} stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                    />
                    
                    {/* Header */}
                    <path 
                      d={`M${node.x} ${node.y+8} Q${node.x} ${node.y} ${node.x+8} ${node.y} L${node.x+NODE_W-8} ${node.y} Q${node.x+NODE_W} ${node.y} ${node.x+NODE_W} ${node.y+8} L${node.x+NODE_W} ${node.y+HEADER_H} L${node.x} ${node.y+HEADER_H} Z`}
                      fill={COLORS.nodeHeader}
                    />
                    
                    <text x={node.x + 15} y={node.y + 28} fontSize="11" fontWeight="700" fill="#fff" style={{textTransform:'uppercase', letterSpacing:'1px'}}>
                      {node.title}
                    </text>

                    {/* Inputs */}
                    {node.in?.map((label, i) => (
                      <g key={label} transform={`translate(0, ${i * ROW_H})`}>
                        <circle cx={node.x} cy={node.y + HEADER_H + ROW_H/2} r="4" fill={COLORS.pin} />
                        <text x={node.x + 12} y={node.y + HEADER_H + 20} fontSize="10" fill="#94a3b8">{label}</text>
                      </g>
                    ))}

                    {/* Outputs */}
                    {node.out?.map((label, i) => (
                      <g key={label} transform={`translate(0, ${i * ROW_H})`}>
                        <circle cx={node.x + NODE_W} cy={node.y + HEADER_H + ROW_H/2} r="4" fill={COLORS.pulse} />
                        <text x={node.x + NODE_W - 12} y={node.y + HEADER_H + 20} fontSize="10" fill="#94a3b8" textAnchor="end">{label}</text>
                      </g>
                    ))}

                    {/* Final Success Overlay */}
                    {isFinal && (
                      <foreignObject x={node.x + 20} y={node.y - 140} width="300" height="200">
                        <motion.div 
                          className="result-card"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          <div className="res-tag">MODEL DEPLOYED</div>
                          <div className="res-stat">R² Score: 0.942</div>
                          <div className="res-graph">
                            <div className="res-bar" style={{height: '40%'}} />
                            <div className="res-bar" style={{height: '70%'}} />
                            <div className="res-bar" style={{height: '60%'}} />
                            <div className="res-bar" style={{height: '90%'}} />
                          </div>
                        </motion.div>
                      </foreignObject>
                    )}
                  </motion.g>
                );
              })}
            </>
          )}
        </motion.svg>
        {<ScrollIndicator />}
      <div className="content-section">
        <div className="text-block" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2>Automated Data Pipelines</h2>
          <p style={{width: '100%'}}>Connecting your data to production-ready regression models has never been this visual. Our engine handles the boilerplate of normalization and splitting automatically.</p>
        </div>
      </div>
      </main>

      

      <NodePage />
      <MeetingAgent />

      <div style={{width:'100vw', height:'100vh', backgroundColor:'var(--bg)'}}>

      </div>
    </div>
  );
};

export default Hiw;