import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./nodepage.css"

const COLORS = {
  bg: "#0b0c11",
  node: "#1c1e26",
  accent: "#00ffcc",
  wire: "#4b5563",
  text: "#94a3b8",
  header: "#2d333f",
  graph: "#2563eb"
};

const NodePage = () => {
  const [step, setStep] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connections, setConnections] = useState([]); // Array to handle multiple wires
  const [graphActive, setGraphActive] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await delay(1000); 
      
      // 1. Spawn S3
      setStep(1); setShowMenu(true); await delay(800);
      setNodes([{ id: 's3', type: 'source', x: 100, y: 200, title: 'S3: Customer_Data.csv', out: ['raw_data'] }]);
      setShowMenu(false); await delay(1000);

      // 2. Spawn ML
      setStep(2); setShowMenu(true); await delay(800);
      setNodes(prev => [...prev, { id: 'ml', type: 'model', x: 400, y: 180, title: 'Linear Regression', in: ['features'], out: ['prediction'] }]);
      setShowMenu(false); await delay(1000);

      // 3. Connect S3 -> ML
      setStep(3); setIsConnecting(true); await delay(800);
      setIsConnecting(false);
      setConnections([{ d: "M 300 240 C 350 240, 350 220, 400 220" }]);
      await delay(1000);

      // 4. Spawn Graph Node
      setStep(4); setShowMenu(true); await delay(800);
      setNodes(prev => [...prev, { id: 'graph', type: 'output', x: 700, y: 150, title: 'Prediction Plotter', in: ['y_hat'] }]);
      setShowMenu(false); await delay(1000);

      // 5. Connect ML -> Graph
      setStep(5); setIsConnecting(true); await delay(800);
      setIsConnecting(false);
      setConnections(prev => [...prev, { d: "M 600 220 C 650 220, 650 190, 700 190" }]);
      
      // 6. Start Graph Animation
      await delay(500);
      setGraphActive(true);
      setStep(6);
      // Restart sequence after a pause
        await delay(4000);
        setGraphActive(false);
        setConnections([]);
        setNodes([]);
        setStep(0);
        await delay(1000);
        sequence();

    };

    sequence();
  }, []);

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  return (
    <div className="hiw-container">
      <div className="hiw-grid" />

      <div className="hiw-overlay-text">
        <motion.h1 animate={{ opacity: step >= 6 ? 1 : 0.4 }}>
          {step < 3 ? "Building Pipeline..." : step < 6 ? "Connecting Analytics..." : "Insight Generated"}
        </motion.h1>
        <p>Streaming 14.2k rows from S3 to Live Visualizer</p>
      </div>

      <div className="hiw-canvas">
        <svg className="hiw-svg-layer">
          {/* Established Connections */}
          {connections.map((conn, i) => (
            <motion.path
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              d={conn.d}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          ))}
          
          {/* Active Dragging Wire */}
          {isConnecting && (
            <motion.path
              d={step === 3 
                ? "M 300 240 C 330 240, 370 220, 395 220" 
                : "M 600 220 C 630 220, 670 190, 695 190"}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="2"
              strokeDasharray="5,5"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 0.5 }}
            />
          )}
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={`hiw-node ${node.type === 'output' ? 'node-large' : ''}`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            style={{ left: node.x, top: node.y }}
          >
            <div className="node-header">
               {node.type === 'source' ? 'S3_BUCKET' : node.type === 'model' ? 'RIDGE_REGRESSION' : 'CHART_OUT'}
            </div>
            <div className="node-body">
              <div className="node-title">{node.title}</div>
              
              {/* Special Graph Output */}
              {node.type === 'output' && (
                <div className="node-graph-container">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="graph-bar"
                        initial={{ height: 2 }}
                        animate={graphActive ? { 
                            height: [10, 40, 25, 50, 20][(i + step)%5],
                            backgroundColor: graphActive ? COLORS.accent : COLORS.wire
                        } : {}}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, repeatType: "reverse" }}
                      />
                    ))}
                </div>
              )}

              <div className="node-ports">
                {node.in && <div className="port port-in"><span className="dot" /> {node.in[0]}</div>}
                {node.out && <div className="port port-out">{node.out[0]} <span className="dot active" /></div>}
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {showMenu && (
            <motion.div 
              className="hiw-menu"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ 
                left: step === 1 ? 100 : step === 2 ? 400 : 700, 
                top: step === 1 ? 200 : step === 2 ? 180 : 150 
              }}
            >
              <div className="menu-search">
                <span className="cursor-text">
                    {step === 1 ? "s3_fetch" : step === 2 ? "linear_reg" : "visualizer"}
                </span>
                <span className="blinker">|</span>
              </div>
              <div className="menu-item active">Select Module</div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="hiw-cursor"
          animate={getCursorCoords(step)}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M0 0 L16 10 L9 12 L12 18 L10 19 L7 13 L0 16 Z" fill="white" stroke="black" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>
      <div className="content-section">
        <div className="text-block" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p style={{width: '40%'}}>Customizability and flexibility driven by our modular node-based architecture. Create your own modules and template changes in real time</p>
        </div>
      </div>
    </div>
  );
};

const getCursorCoords = (step) => {
  switch(step) {
    case 1: return { x: 130, y: 230 }; 
    case 2: return { x: 430, y: 210 }; 
    case 3: return { x: 300, y: 240 }; // Start drag 1
    case 4: return { x: 730, y: 180 }; 
    case 5: return { x: 600, y: 220 }; // Start drag 2
    case 6: return { x: 800, y: 350 }; // Finished
    default: return { x: 400, y: 500 };
  }
};

export default NodePage;