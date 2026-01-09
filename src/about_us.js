import React from 'react';
import Nav from './nav';
import logo from './logo.png';
export default function About() {
  return (
    <div className="about-root">
      <Nav logo={logo} />
      <section className="about-hero">
        <h1>About Murmurly</h1>
        <p>
          Murmurly is building a new layer of financial intelligence designed for clarity,
          accountability, and real decision making.
        </p>
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
