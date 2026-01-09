import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  wire: "#4b5563",
  pulse: "#00ffcc",
  nodeBody: "#1c1e26",
  nodeHeader: "#2d333f",
  pin: "#ffcc00"
};

const NODE_W = 200;
const ROW_H = 32; // Exact row height for pin matching
const HEADER_H = 40;

const NODES = [
  { id: 'csv', title: 'Macro CSV Data', x: 50, y: 50, out: ['VALUE (FedFunds)', 'YLDTOMAT (2Y)', 'YLDTOMAT (5Y)', 'MID_PRICE (Swap)'] },
  { id: 'mdrm', title: 'Bank MDRM Codes', x: 50, y: 320, out: ['RCON2122 (Loan Bal)', 'RIAD4010 (Loan Inc)', 'RCON6835+ (Dep Bal)', 'RIAD0093+ (Dep Exp)', 'RCON3210 (Equity)'] },
  { id: 'const', title: 'Market Constants', x: 50, y: 620, out: ['Shares Outstanding', 'Cost of Equity (Ke)'] },
  { id: 'yield', title: 'Math: Yield Slope', x: 320, y: 50, in: ['TR 5Y', 'Fed Rate'], out: ['Slope Result'] },
  { id: 'ratio', title: 'Hist. Ratio Engine', x: 320, y: 250, in: ['Loan Bal', 'Loan Inc', 'Dep Bal', 'Dep Exp'], out: ['hist_loan_yield', 'hist_dep_cost'] },
  { id: 'beta', title: 'Active Beta Calc', x: 320, y: 520, in: ['hist_dep_cost', 'curr_fed'], out: ['active_beta'] },
  { id: 'ml', title: 'Ridge ML (Training)', x: 600, y: 150, in: ['Slope', 'TR 2Y', 'Swap 5Y', 'hist_yield'], out: ['trained_ridge_model'] },
  { id: 'stoch', title: 'Stochastic Path', x: 600, y: 450, in: ['Start Fed', 'Start TR 5Y'], out: ['stoch_rate_path'] },
  { id: 'loop', title: 'Simulation Loop', x: 880, y: 300, in: ['ML Model', 'Stoch Rates', 'Active Beta', 'Equity Bal'], out: ['div_t_stream'] },
  { id: 'final', title: 'Final Price Builder', x: 1160, y: 300, in: ['div_t_stream', 'Ke Factor', 'Shares Tot'], out: ['IMPLIED P0', '$54.21'] },
];

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

const Connection = ({ from, to, delay }) => {
  const start = getPinPos(from[0], from[1], 'out');
  const end = getPinPos(to[0], to[1], 'in');
  const d = `M ${start.x} ${start.y} C ${start.x + 80} ${start.y}, ${end.x - 80} ${end.y}, ${end.x} ${end.y}`;

  return (
    <g>
      <path d={d} fill="none" stroke={COLORS.wire} strokeWidth="1.5" opacity="0.3" />
      <circle r="2.5" fill={COLORS.pulse}>
        <animateMotion dur="3.5s" repeatCount="indefinite" path={d} begin={`${delay}s`} />
      </circle>
    </g>
  );
};

const NodeBackground = () => {
  const [phase, setPhase] = useState('prompt');
  const [text, setText] = useState("");
  const fullText = "build me a ddm for MBank";

  useEffect(() => {
    if (phase === 'prompt') {
      let i = 0;
      const timer = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(timer);
          setTimeout(() => setPhase('nodes'), 800);
        }
      }, 60);
    } else if (phase === 'nodes') {
      setTimeout(() => setPhase('report'), 2000);
    setTimeout(() => { setPhase('prompt'); }, 10000); // Loop back to prompt after showing report
    }
  }, [phase]);

  return (
    <div className="bg-canvas">
      <div className="grid-overlay" />
      
      <AnimatePresence>
        {phase === 'prompt' && (
          <motion.div className="prompt-overlay" exit={{ opacity: 0, scale: 0.9 }} style={{ position:'absolute'}}>
            <div className="prompt-window">{"> "} {text}<span className="blinker">|</span></div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg
  viewBox="0 0 1450 900"
  preserveAspectRatio="xMidYMid meet"
  className={`engine-svg ${phase === 'prompt' ? 'hidden' : ''}`}
>
  {phase !== 'prompt' && (
    <>
      <Connection from={['csv', 'YLDTOMAT (5Y)']} to={['yield', 'TR 5Y']} delay={0} />
      <Connection from={['csv', 'VALUE (FedFunds)']} to={['yield', 'Fed Rate']} delay={0.2} />
      <Connection from={['csv', 'VALUE (FedFunds)']} to={['beta', 'curr_fed']} delay={0.4} />
      <Connection from={['mdrm', 'RCON2122 (Loan Bal)']} to={['ratio', 'Loan Bal']} delay={0.1} />
      <Connection from={['mdrm', 'RIAD4010 (Loan Inc)']} to={['ratio', 'Loan Inc']} delay={0.2} />
      <Connection from={['mdrm', 'RCON6835+ (Dep Bal)']} to={['ratio', 'Dep Bal']} delay={0.3} />
      <Connection from={['mdrm', 'RIAD0093+ (Dep Exp)']} to={['ratio', 'Dep Exp']} delay={0.4} />
      <Connection from={['mdrm', 'RCON3210 (Equity)']} to={['loop', 'Equity Bal']} delay={0.5} />
      <Connection from={['yield', 'Slope Result']} to={['ml', 'Slope']} delay={0.8} />
      <Connection from={['csv', 'YLDTOMAT (2Y)']} to={['ml', 'TR 2Y']} delay={0.9} />
      <Connection from={['csv', 'MID_PRICE (Swap)']} to={['ml', 'Swap 5Y']} delay={1.0} />
      <Connection from={['ratio', 'hist_loan_yield']} to={['ml', 'hist_yield']} delay={1.1} />
      <Connection from={['ratio', 'hist_dep_cost']} to={['beta', 'hist_dep_cost']} delay={0.6} />
      <Connection from={['csv', 'VALUE (FedFunds)']} to={['stoch', 'Start Fed']} delay={1.2} />
      <Connection from={['csv', 'YLDTOMAT (5Y)']} to={['stoch', 'Start TR 5Y']} delay={1.3} />
      <Connection from={['ml', 'trained_ridge_model']} to={['loop', 'ML Model']} delay={1.8} />
      <Connection from={['stoch', 'stoch_rate_path']} to={['loop', 'Stoch Rates']} delay={2.0} />
      <Connection from={['beta', 'active_beta']} to={['loop', 'Active Beta']} delay={2.2} />
      <Connection from={['loop', 'div_t_stream']} to={['final', 'div_t_stream']} delay={2.8} />
      <Connection from={['const', 'Cost of Equity (Ke)']} to={['final', 'Ke Factor']} delay={3.0} />
      <Connection from={['const', 'Shares Outstanding']} to={['final', 'Shares Tot']} delay={3.2} />

      {NODES.map((node, idx) => {
        const showReport = node.id === 'final' && phase === 'report';
        const rows = Math.max(node.in?.length || 0, node.out?.length || 0);
        const bodyH = HEADER_H + rows * ROW_H;

        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <motion.rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={bodyH}
              rx="6"
              fill={COLORS.nodeBody}
              stroke={COLORS.wire}
              strokeWidth="1"
              animate={{ opacity: showReport ? 0 : 1 }}
            />
            <motion.rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={HEADER_H}
              rx="6"
              fill={COLORS.nodeHeader}
              animate={{ opacity: showReport ? 0 : 1 }}
            />

            <text
              x={node.x + NODE_W / 2}
              y={node.y + 26}
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#ffffff"
              style={{ letterSpacing: '0.5px' }}
            >
              {node.title.toUpperCase()}
            </text>

            {node.in?.map((l, i) => (
              <g key={l}>
                <circle
                  cx={node.x + 10}
                  cy={node.y + HEADER_H + i * ROW_H + ROW_H / 2}
                  r="3"
                  fill={COLORS.pin}
                />
                <text
                  x={node.x + 20}
                  y={node.y + HEADER_H + i * ROW_H + 22}
                  fontSize="9"
                  fill="#d1d5db"
                >
                  {l}
                </text>
              </g>
            ))}

            {node.out?.map((l, i) => (
              <g key={l}>
                <circle
                  cx={node.x + NODE_W - 10}
                  cy={node.y + HEADER_H + i * ROW_H + ROW_H / 2}
                  r="3"
                  fill={COLORS.pin}
                />
                <text
                  x={node.x + NODE_W - 20}
                  y={node.y + HEADER_H + i * ROW_H + 22}
                  fontSize="9"
                  fill="#d1d5db"
                  textAnchor="end"
                >
                  {l}
                </text>
              </g>
            ))}

            {showReport && (
              <foreignObject
                x={node.x - 50}
                y={node.y - 100}
                width={NODE_W + 200}
                height={700}
                style={{ overflow: 'hidden' }}
              >
                <div className="fo-inner" style={{ paddingTop: '100px', paddingLeft: '50px' }}>
                  <motion.div
                    className="report-3d"
                    initial={{ opacity: 0, scale: 0, rotateY: 60, y: 50 }}
                    animate={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 5, y: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <div className="report-paper">
                      <div className="rep-head">MBANK INSIGHTS</div>
                      <div className="rep-val">$54.21</div>
                      <div className="rep-sub">MBank Valuation 2026</div>
                      <div className="rep-chart">
                        {[30, 60, 45, 90, 70].map((h, i) => (
                          <div key={i} className="bar" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </foreignObject>
            )}
          </motion.g>
        );
      })}
    </>
  )}
</svg>

    </div>
  );
};

export default NodeBackground;