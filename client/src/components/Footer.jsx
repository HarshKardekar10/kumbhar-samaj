import React from 'react';

const Footer = () => {
  return (
    // Use the new 'footer-theme' class
    <footer className="footer-theme text-center">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} Kumbhar Samaj Community. All rights reserved.</p>
        <p className="small mt-2">Crafted with ❤️ for our community.</p>
      </div>
    </footer>
  );
};

export default Footer;
