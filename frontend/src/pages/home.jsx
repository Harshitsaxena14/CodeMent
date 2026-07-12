import Hero from "../components/Hero";
import LearningPipeline from "../components/LearningPipeline";
import HowItWorks from "../components/HowItWorks";
import AIMentorPreview from "../components/AIMentorPreview";
import ExtensionPreview from "../components/ExtensionPreview";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="noise-bg bg-zinc-950 text-zinc-50 flex flex-col">
      <Hero />
      <LearningPipeline />
      <HowItWorks />
      <AIMentorPreview />
      <ExtensionPreview />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
