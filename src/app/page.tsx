import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hey What's up",
  description: "Created by Me"
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
