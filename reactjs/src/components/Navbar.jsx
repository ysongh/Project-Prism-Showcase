import React from 'react';
import { Link } from "wouter";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Project Prism Showcase</div>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <Link href="/gallery">Gallery</Link>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;