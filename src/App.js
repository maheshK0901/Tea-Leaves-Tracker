import { Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import Notes from "./pages/Notes";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;
