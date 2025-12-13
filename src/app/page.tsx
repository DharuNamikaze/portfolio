import Projects from "../../components/Projects";
import "./globals.css";
import Acheivements from "../../components/Acheivements";
import Intro from "../../components/Intro";
import Footer from "../../components/Footer";
export default function Home() {

  return (
    <>
      <Intro />
      <Acheivements />
      <Projects />
      <Footer />
    </>
  );
}
