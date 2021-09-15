import React from "react";
import Link from "next/link";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

const Footer = () => (
  <footer>
    <Container>
      <div>
        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/terms">Terms of service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <p className="mt-3">© Mintapost, Inc. All rights reserved.</p>
      </div>
    </Container>
  </footer>
);

export default Footer;
