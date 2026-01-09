import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NodeBackground from './NodeBackground';
import logo from './logo.png';
import './index.css';
import DropdownCards from './dropdown';
import Hiw from './hiw';
import Nav from './nav';
import About from './about_us';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="page-root">
      <NodeBackground/>

      <div className="site-overlay">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} logo={logo} />

        <header className="hero">
          <h1>
            Real-Time Financial Intelligence — <br />
            <span>Reliable, Traceable, Actionable.</span>
          </h1>
          <p>Murmurly provides you intelligence for modeling, meetings, reports, and more.</p>
          <div className="hero-btns">
            <button className="btn-p">Get Early Access</button>
            <button className="btn-s">Watch Demo</button>
          </div>
        </header>
      </div>

      <div style={{ backgroundColor: 'white', height: '100vh', zIndex: '5', position: 'relative' }}>
        <DropdownCards />
      </div>

      <div style={{ backgroundColor: 'var(--bg)', padding: '40px 20px', zIndex: '5', position: 'relative' }}>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          © 2026 Murmurly. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hiw" element={<Hiw isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} logo={logo} />} />
        <Route path="/about_us" element={<About />} />
      </Routes>
    </Router>
  );
}
