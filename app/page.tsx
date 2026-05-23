"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
export default function Home() {
  return (
    <main className="bg-ink text-paper overflow-x-hidden">
      <Navbar /><Hero /><About /><Projects /><Research /><Skills /><Experience /><Contact /><Footer /><ChatBot />
    </main>
  );
}
