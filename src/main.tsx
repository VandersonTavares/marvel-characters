import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importando os componentes necessários do React Router
import "./index.css";
import App from "./App.tsx";
import CharacterDetailsCard from "./components/CharacterDetailsCard/CharacterDetailsCard.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> {/* Rota principal para o App */}
      <Route path="/character/:id" element={<CharacterDetailsCard />} />{" "}
      {/* Rota para detalhes do personagem */}
    </Routes>
  </Router>
);
