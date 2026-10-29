
import { useEffect, useState } from "react";
import "./App.css";
import { isCountry, type countryType } from "./type";
import Countries from "./components/countries/countries";

async function fetchCountries(signal: AbortSignal): Promise<countryType[]> {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/all",
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Country API request failed (${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isCountry)) {
    throw new Error("Country API returned an invalid country list");
  }

  return data;
}

function App() {
  const [countries, setCountries] = useState<countryType[] | null>(null);
  const [hasCountriesError, setHasCountriesError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchCountries(controller.signal)
      .then(setCountries)
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to load country data.", error);
        setHasCountriesError(true);
      });

    return () => controller.abort();
  }, [loadAttempt]);

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
      <header id="explore" className="hero">
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
        {countries ? (
          <Countries countries={countries} />
        ) : hasCountriesError ? (
          <div className="load-error" role="alert">
            <h2>Country data is temporarily unavailable.</h2>
            <p>Please check your connection and try again.</p>
            <button
              type="button"
              onClick={() => {
                setHasCountriesError(false);
                setLoadAttempt((attempt) => attempt + 1);
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="loading" role="status">
            <div className="loader"></div>
            <h2>Exploring the world...</h2>
            <p>Loading countries for you.</p>
          </div>
        )}
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
