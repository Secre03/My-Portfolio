import { Noise, Spotlight } from "./components/ui/effects.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import FloatingSocials from "./components/layout/FloatingSocials.jsx";
import { HomePage } from "./pages/index.jsx";
import ChatBot from "./components/layout/ChatBot.jsx";

export default function App() {
  return (
    <>
      <Noise />
      <Spotlight />
      <FloatingSocials />
      <ChatBot />

      <Navbar />

      <main>
        <HomePage />
      </main>

      <Footer />
    </>
  );
}
