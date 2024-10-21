import { useState } from 'react';
import { Link } from "wouter";

const Landing = ({ setETHAddress}) => {
  const [address, setAddress] = useState('');

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0]);
    setAddress(accounts[0]);
    setETHAddress(accounts[0]);
  }

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Project Prism Showcase</h1>
        <p>A 3D Coding Project Gallery to Explore and Innovate</p>
        {!address ? <button className="cta-button"  onClick={() => connectMetamask()}>
          Connect Wallet
        </button> : <Link className="cta-button" href="/gallery">Explore Gallery</Link>}
        <w3m-button />
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Interactive 3D Models</h3>
            <p>Browse through immersive 3D projects created by coders and designers.</p>
          </div>
          <div className="feature">
            <h3>Live Code Demos</h3>
            <p>Watch real-time demonstrations of coding techniques in action.</p>
          </div>
          <div className="feature">
            <h3>Collaborative Space</h3>
            <p>Join a community of developers and contribute to shared projects.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <h2>Gallery</h2>
        <p>Explore some of the latest projects from our community.</p>
        {/* You can map over projects here */}
        <div className="gallery-grid">
          <div className="gallery-item">Project 1</div>
          <div className="gallery-item">Project 2</div>
          <div className="gallery-item">Project 3</div>
          <div className="gallery-item">Project 4</div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Have questions or want to join? Reach out to us!</p>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Project Prism. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
