import React, { useState } from 'react';
import NodeBackground from './NodeBackground';
import logo from './logo.png';
import './index.css';
import DropdownCards from './dropdown';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="page-root">
      <NodeBackground/>
      
      <div className="site-overlay">
        <nav className="navbar">
          <div className="nav-container">
            <div className="brand">
              <img src={logo} alt="Logo" className="brand-logo" />
              <span>Murmurly</span>
            </div>

            {/* Desktop Navigation - Hidden on Mobile via CSS */}
            <div className="nav-items-desktop">
              <a href="#features">Features</a>
              <button className="cta-nav">Get Access</button>
            </div>

            {/* Mobile Menu Toggle - Hidden on Desktop via CSS */}
            <button 
              className="menu-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Dropdown Menu - Strictly hidden unless toggled on small screens */}
          <div className={`nav-items-mobile ${isMenuOpen ? 'open' : ''}`} style={{ display: isMenuOpen ? 'flex' : 'none' }}>
            <button className="cta-nav">Features</button>
            <button className="cta-nav">Get Access</button>
          </div>
        </nav>

        <header className="hero">
          <h1>Real-Time Intelligence — <br/><span>Reliable, Traceable, Actionable.</span></h1>
          <p>Murmurly provides you intelligence for modeling, meetings, reports, and more.</p>
          <div className="hero-btns">
            <button className="btn-p">Get Early Access</button>
            <button className="btn-s">Watch Demo</button>
          </div>
        </header>
      </div>

      <div style={{backgroundColor:'white', height:'100vh', zIndex:'5', position:'relative'}}>
        {/* Additional page content can go here */}
        <DropdownCards />
      </div>
      

      <div style={{backgroundColor:'var(--bg)', padding:'40px 20px', zIndex:'5', position:'relative'}}>
        {/* Footer can go here */}
        <div>
          <p style={{textAlign:'center', color:'var(--text-muted)'}}>© 2026 Murmurly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;