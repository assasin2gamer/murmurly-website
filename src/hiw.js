import Nav from "./nav";
import logo from './logo.png';
import React, { useState } from "react";
export default function Hiw() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="page-root">
            <div className="site-overlay">
                <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} logo={logo} />
            </div>
        </div>
    );
};
