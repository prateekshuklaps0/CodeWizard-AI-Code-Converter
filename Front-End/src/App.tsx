import "./App.css";
import ParticleOptions from "./Styles/ParticleOptions.json";
import Navbar from "./Components/Navbar";
import CodeArea from "./Components/CodeArea";
import Footer from "./Components/Footer";

import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";
import { Box } from "@chakra-ui/react";

function App() {
  type ParticleOptionsType = Record<string, unknown>;
  const ParticleInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Box>
      <Particles
        options={ParticleOptions as ParticleOptionsType}
        init={ParticleInit}
      />
      <Navbar />
      <CodeArea />
      <Footer />
    </Box>
  );
}

export default App;
