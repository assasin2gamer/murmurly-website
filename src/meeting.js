import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot, MessageSquare, Zap, CheckCircle, Database, Mail } from 'lucide-react';
import './meeting.css';

const MeetingAgent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const sequence = async () => {
      await delay(1500);
      setActiveStep(1);
      setTranscript("Sarah, can you sync the new S3 data with the CRM by Friday?");
      await delay(2000);

      setActiveStep(2);
      addLog("Speech-to-Text confirmed.");
      addLog("Intent detected: Task Assignment.");
      await delay(1000);

      setActiveStep(3);
      addLog("Searching team calendar...");
      addLog("Checking CRM API endpoints...");
      await delay(500);

      setActiveStep(4);
      addLog("Action: Created Jira Task #992.");
      addLog("Action: Notification sent.");
      await delay(1000);

      setActiveStep(5);
      await delay(1000);

      setLogs([]);
      setTranscript("");
      setActiveStep(0);
      sequence();
    };
    sequence();
  }, []);

  const addLog = (msg) => setLogs(prev => [...prev.slice(-3), { id: Date.now(), msg }]);
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  return (
    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="text-block" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'30px'}}>
          <h2>Real-Time Agents</h2>
          <p style={{width: '80%', textAlign: 'center'}}>Connecting and understanding your team in a revolutionary new way.</p>
        </div>
      <div className="meeting-grid-bg" />

      {/* Header */}
      <div className="meeting-header">
        <div className="status-badge">
          <div className="pulse-red" /> 11:02 AM • LIVE CALL
        </div>
      </div>

      <div className="meeting-main-layout">
        
        {/* TOP/LEFT: Video Section */}
        <div className="meeting-view">
          <div className="video-grid">
            <Participant name="Alex" talking={false} />
            <Participant name="Sarah" talking={false} />
            <Participant name="Jordan" talking={activeStep === 1} />
            
            <motion.div 
              className={`agent-tile ${activeStep > 1 ? 'active' : ''}`}
              animate={{ borderColor: activeStep === 3 ? '#00ffcc' : 'rgba(255,255,255,0.1)' }}
            >
              <div className="agent-icon-wrap">
                <Bot size={window.innerWidth < 768 ? 24 : 32} color={activeStep > 1 ? "#00ffcc" : "#666"} />
                {activeStep === 3 && <motion.div className="thinking-spinner" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />}
              </div>
              <span className="tile-name">AI AGENT</span>
            </motion.div>
          </div>

          {/* Transcript positioned relatively below/on-top of video */}
          <AnimatePresence>
            {transcript && (
              <motion.div 
                className="transcript-bubble"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span className="speaker">Jordan:</span> {transcript}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM/RIGHT: Agent Logic */}
        <div className="agent-brain-panel">
          <div className="brain-header">
            <Zap size={14} /> INTERNAL MONOLOGUE
          </div>
          
          <div className="mini-workflow">
            <StepIcon icon={<MessageSquare size={16}/>} active={activeStep === 2} done={activeStep > 2} />
            <div className="line" />
            <StepIcon icon={<Database size={16}/>} active={activeStep === 3} done={activeStep > 3} />
            <div className="line" />
            <StepIcon icon={<Mail size={16}/>} active={activeStep === 4} done={activeStep > 4} />
          </div>

          <div className="log-window">
            {logs.map((log) => (
              <motion.div key={log.id} className="log-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle size={12} color="#00ffcc" /> {log.msg}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {activeStep === 5 && (
              <motion.div className="result-toast" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <div className="toast-accent">NEW JIRA TASK</div>
                <strong>Sync CRM Data</strong>
                <p>Assignee: Sarah</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

const Participant = ({ name, talking }) => (
  <div className={`video-tile ${talking ? 'talking' : ''}`}>
    <div className="avatar-circle"><User size={24} color="#555" /></div>
    <span className="tile-name">{name}</span>
    {talking && (
      <div className="voice-indicator">
        {[1,2,3].map(i => <motion.div key={i} animate={{ height: [2, 10, 2] }} transition={{ repeat: Infinity, duration: 0.5, delay: i*0.1 }} />)}
      </div>
    )}
  </div>
);

const StepIcon = ({ icon, active, done }) => (
  <div className={`brain-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
    {icon}
  </div>
);

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export default MeetingAgent;