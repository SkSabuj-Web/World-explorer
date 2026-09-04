
import { Suspense } from "react";
import "./App.css";
import type { countryType } from "./type";
import Countries from "./components/countries/countries";

const countriesPromise = async (): Promise<countryType[]> => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/all"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();
  return data.countries;
};

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span>🌍</span>
            World Explorer
          </div>

          <div className="nav-links">
            <a href="#countries">Countries</a>
            <a href="#explore">Explore</a>
            <a href="#about">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            🌎 Discover the World
          </span>

          <h1>
            Explore the World
            <span> One Country at a Time.</span>
          </h1>

          <p>
            Discover countries, explore their capitals, learn about
            populations, and build your personal travel collection.
          </p>

          <a href="#countries" className="hero-button">
            Start Exploring →
          </a>
        </div>

        <div className="hero-globe">🌍</div>
      </header>

      {/* Countries */}
      <main id="countries" className="main-content">
        <Suspense
          fallback={
            <div className="loading">
              <div className="loader"></div>
              <h2>Exploring the world...</h2>
              <p>Loading countries for you.</p>
            </div>
          }
        >
          <Countries countriesPromise={countriesPromise()} />
        </Suspense>
      </main>

      {/* Footer */}
      <footer id="about" className="footer">
        <h2>🌍 World Explorer</h2>
        <p>
          Discover. Explore. Learn. Connect with the world.
        </p>
        <small>© 2026 World Explorer. Built with React & TypeScript.</small>
      </footer>
    </div>
  );
}

export default App;

