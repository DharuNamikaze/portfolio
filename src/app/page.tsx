'use client'
import Projects from "../../components/Projects";
import "./globals.css";
import Acheivements from "../../components/Acheivements";
import Intro from "../../components/Intro";
import Footer from "../../components/Footer";
// import About from "../../components/About";
export default function Home() {

  return (
    <div className="">
      <Intro />
      <Acheivements />
      <Projects />
      {/* <About/> */}
      
      

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
