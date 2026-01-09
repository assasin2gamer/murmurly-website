import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot, MessageSquare, Zap, CheckCircle, Database, Mail } from 'lucide-react';
import './meeting.css';

const MeetingAgent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [logs, setLogs] = useState([]);

  // Animation Sequence
  useEffect(() => {
    const sequence = async () => {
      await delay(1500);
      
      // 1. Human Speaking
      setActiveStep(1);
      setTranscript("Sarah, can you make sure we sync the new S3 data with the CRM by Friday?");
      await delay(3000);

      // 2. Agent Listening & Processing
      setActiveStep(2);
      addLog("Speech-to-Text confirmed.");
      addLog("Intent detected: Task Assignment.");
      await delay(2000);

      // 3. Thinking / Agentic Loop
      setActiveStep(3);
      addLog("Searching team calendar for Sarah...");
      addLog("Checking CRM API for endpoint 'sync_v2'...");
      await delay(2500);

      // 4. Executing Action
      setActiveStep(4);
      addLog("Action: Created Jira Task #992.");
      addLog("Action: Notification sent to Sarah.");
      await delay(2000);

      // 5. Final Confirmation
      setActiveStep(5);
      await delay(4000);

      // Reset
      setLogs([]);
      setTranscript("");
      setActiveStep(0);
      sequence();
    };

    sequence();
  }, []);

  const addLog = (msg) => setLogs(prev => [...prev, { id: Date.now(), msg }]);
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  return (
    <div className="meeting-root">
      <div className="meeting-grid-bg" />

      {/* Header Info */}
      <div className="meeting-header">
        <div className="status-badge">
          <div className="pulse-red" /> 11:02 AM • LIVE STRATEGY CALL
        </div>
      </div>

      <div className="meeting-container">
        
        {/* LEFT: Participant Grid */}
        <div className="participants-section">
          <div className="video-grid">
            <Participant name="Alex (Host)" active={false} />
            <Participant name="Sarah" active={false} />
            <Participant name="Jordan" active={activeStep === 1} talking={activeStep === 1} />
            
            {/* The AI Agent Participant */}
            <motion.div 
              className={`agent-participant ${activeStep > 1 ? 'active-agent' : ''}`}
              animate={{ borderColor: activeStep === 3 ? '#00ffcc' : 'rgba(255,255,255,0.1)' }}
            >
              <div className="agent-avatar">
                <Bot size={40} color={activeStep > 1 ? "#00ffcc" : "#666"} />
                {activeStep === 3 && <motion.div className="thinking-ring" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />}
              </div>
              <div className="part-name">AI ASSISTANT</div>
              {activeStep > 1 && (
                <div className="agent-status-label">
                  {activeStep === 2 && "Listening..."}
                  {activeStep === 3 && "Thinking..."}
                  {activeStep >= 4 && "Task Executed"}
                </div>
              )}
            </motion.div>
          </div>

          {/* Live Transcript Bubble */}
          <AnimatePresence>
            {transcript && (
              <motion.div 
                className="live-transcript"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="trans-meta">Jordan speaking:</div>
                "{transcript}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Agent "Brain" / Workflow */}
        <div className="agent-workflow-panel">
          <div className="panel-header">
            <Zap size={16} /> INTERNAL MONOLOGUE
          </div>
          
          <div className="workflow-steps">
            <StepIcon icon={<MessageSquare />} label="NLP Parser" active={activeStep === 2} done={activeStep > 2} />
            <div className="step-connector" />
            <StepIcon icon={<Database />} label="Context Retrieval" active={activeStep === 3} done={activeStep > 3} />
            <div className="step-connector" />
            <StepIcon icon={<Mail />} label="Tool Execution" active={activeStep === 4} done={activeStep > 4} />
          </div>

          <div className="agent-logs">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div 
                  key={log.id} 
                  className="log-entry"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <CheckCircle size={12} color="#00ffcc" />
                  <span>{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {activeStep === 5 && (
            <motion.div 
              className="action-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="card-top">JIRA TASK CREATED</div>
              <div className="card-title">Sync CRM & S3 Data</div>
              <div className="card-meta">Assigned to: Sarah • Due: Friday</div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

// Sub-components for cleaner code
const Participant = ({ name, talking }) => (
  <div className={`participant-card ${talking ? 'talking' : ''}`}>
    <div className="p-avatar"><User size={32} color="#555" /></div>
    <div className="part-name">{name}</div>
    {talking && <div className="audio-wave">
      {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: i*0.1 }} />)}
    </div>}
  </div>
);

const StepIcon = ({ icon, label, active, done }) => (
  <div className={`step-item ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
    <div className="step-icon-circle">{icon}</div>
    <div className="step-label">{label}</div>
  </div>
);

export default MeetingAgent;