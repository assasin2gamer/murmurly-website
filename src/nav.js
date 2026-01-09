import { Link } from 'react-router-dom';
import logo from './logo.png';


export default function Nav({ isMenuOpen, setIsMenuOpen, logo }) {
  return (
    <nav className="navbar">
          <div className="nav-container">
            <div className="brand">
              <img src={logo} alt="Logo" className="brand-logo" />
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
              <span>Murmurly</span>
                </Link>
            </div>

            <div className="nav-items-desktop">
              <Link to="/hiw">How It Works</Link>
              <Link to="/about_us">About Us</Link>
              <a href="#features">Features</a>
              <button className="cta-nav">Get Access</button>
            </div>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          <div
            className={`nav-items-mobile ${isMenuOpen ? 'open' : ''}`}
            style={{ display: isMenuOpen ? 'flex' : 'none' }}
          >
            <Link to="/hiw" onClick={() => setIsMenuOpen(false)} className="cta-nav">How It Works</Link>
            <Link to="/features" onClick={() => setIsMenuOpen(false)} className="cta-nav">Features</Link>
            <Link to="/get-access" onClick={() => setIsMenuOpen(false)} className="cta-nav">Get Access</Link>
            <Link to="/about_us" onClick={() => setIsMenuOpen(false)} className="cta-nav">About Us</Link>
          </div>
        </nav>
);
}