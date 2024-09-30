import React from 'react';
import { Link } from "wouter";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Project Prism Showcase</div>
      <ul className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/create-project">Create Project</Link>
      </ul>
    </nav>
  )
}

export default Navbar;