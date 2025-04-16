import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PokemonDetail from './components/PokemonDetail';
import PokemonList from './components/PokemonList';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;