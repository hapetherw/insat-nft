import Link from "next/link";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

export default function Custom404() {
  return (
    <div className="not-found-page text-center">
      <h1 className="text-center mb-5">404 - Page Not Found</h1>
      <Link href={"/"}>
        <Button className="pink-button">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}