import React from 'react';
import Nav from './nav';
import logo from './logo.png';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Optional: for social icons
import './about.css';
import { useState } from 'react';
import stephen from './images/stephen.png';
import greg from './images/greg.png';

export default function About() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="about-root">
      <Nav logo={logo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <section className="about-hero">
        <h1>About Murmurly</h1>
        <p>
          Murmurly is a real-time financial intelligence engine that converts raw, unstructured conversation into structured analysis, diagnostics, and decision-ready models. Our technology listens to the way professionals think, challenge assumptions, qualify information, and navigate uncertainty and then transforms that complexity into clarity.

More than just a notetaker, Murmurly is infrastructure - the reasoning layer that sits on top of live human dialogue so financial operators, analysts, PMs, researchers, and teams can make faster, clearer, more accountable decisions.
        </p>
      </section>
      {/* NEW TEAM SECTION */}
      <section className="about-team">
        <h2>The Minds Behind Murmurly</h2>
        <div className="team-grid">
          
          <div className="team-card">
            <div className="member-image-wrap">
              <img src={greg} alt="Founder 1" />
              <div className="image-overlay" />
            </div>
            <div className="member-info">
              <h3>Greg Jospeh</h3>
              <span className="member-role">Co-Founder and CEO </span>
              <p>
                7-Year NFL Veteran with experience performing under extreme pressure. Building Murmurly to bring real-time intelligence and clarity to high-stakes conversations, drawing from years of elite performance, decision-making, and accountability at the highest level.

              </p>
              <div className="member-socials">
                <Linkedin size={18} />
                <Twitter size={18} />
                <Github size={18} />
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="member-image-wrap">
              <img src={stephen} alt="Founder 2" />
              <div className="image-overlay" />
            </div>
            <div className="member-info">
              <h3>Stephen Chang</h3>
              <span className="member-role">Technical Co-Founder / Strategy</span>
              <p>
                Computational background with engineering experience at Amazon and in Quantitative Research. Focused on building scalable, real-time AI systems that merge statistical modeling with interpretable interfacing.

              </p>
              <div className="member-socials">
                <Linkedin size={18} />
                <Twitter size={18} />
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="about-section">
        <div className="about-grid">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              Financial models are everywhere, but trust is rare. Our mission is to make
              financial intelligence transparent, traceable, and usable in real time,
              without black boxes or hand waving.
            </p>
          </div>

          <div className="about-card">
            <h2>Why We Exist</h2>
            <p>
              Analysts, investors, and operators spend too much time rebuilding the same
              models and too little time understanding outcomes. Murmurly turns complex
              financial reasoning into a visible, auditable system.
            </p>
          </div>

          <div className="about-card">
            <h2>What We Build</h2>
            <p>
              We build modular financial engines that combine market data, institutional
              disclosures, and modeling logic into live systems you can inspect, adapt,
              and defend.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2>Our Principles</h2>
        <div className="values-grid">
          <div className="value">
            <h3>Traceability</h3>
            <p>Every number should have a clear origin and a clear path.</p>
          </div>
          <div className="value">
            <h3>Rigor</h3>
            <p>Models should reflect reality, not just convenience.</p>
          </div>
          <div className="value">
            <h3>Clarity</h3>
            <p>Complex systems should be understandable, not obscured.</p>
          </div>
          <div className="value">
            <h3>Accountability</h3>
            <p>Decisions improve when assumptions are explicit.</p>
          </div>
        </div>
      </section>

      

      <section className="about-footer">
        <p>
          Murmurly is built by people who believe finance should be explainable,
          defensible, and useful.
        </p>
      </section>
    </div>
  );
}