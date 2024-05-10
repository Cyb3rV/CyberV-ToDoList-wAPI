import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Container } from "react-bootstrap";
import { Jumbotron } from "@/components/Jumbotron";
import Link from "next/link";


export default function Home() {
  return (
    <Container>
      <Jumbotron/>
      <Link href="/about">About</Link>
    </Container>
  );
}
