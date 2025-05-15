import GetStarted from "@/components/boost/getStarted";
import Hero from "@/components/hero/hero";
import Shortening from "@/components/shorten/urlShortening";
import AdvancedStatistics from "@/components/statistics/advancedStatistics";
import Footer from "@/layouts/footer";
import NavBar from "@/layouts/nav";
import Image from "next/image";
import './globals.css'

export default function Home() {
  return (
    <div className="antialiased">
      <NavBar/>
      <Hero/>
      <Shortening/>
      <AdvancedStatistics/>
      <GetStarted/>
      <Footer/>
    </div>
  );
}
