import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/history" element={<h1>History Page</h1>} />
          <Route path="/notes" element={<h1>Notes Page</h1>} />
        </Routes>
    </div>
  );
}

export default App;
