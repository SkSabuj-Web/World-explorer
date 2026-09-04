
import { use, useMemo, useState } from "react";
import type { countryType } from "../../type";
import Country from "../country/country";
import "./countries.css";

export interface CountriesProps {
  countriesPromise: Promise<countryType[]>;
}

export default function Countries({
  countriesPromise,
}: CountriesProps) {
  const countries = use(countriesPromise);

  const [visitedCountries, setVisitedCountries] = useState<
    countryType[]
  >([]);

  const [search, setSearch] = useState("");

  const handleVisitedCountry = (country: countryType): void => {
    setVisitedCountries((previous) => {
      const alreadyVisited = previous.some(
        (item) => item.ccn3.ccn3 === country.ccn3.ccn3
      );

      if (alreadyVisited) {
        return previous.filter(
          (item) => item.ccn3.ccn3 !== country.ccn3.ccn3
        );
      }

      return [...previous, country];
    });
  };

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [countries, search]);

  return (
    <section>
      {/* Section Header */}
      <div className="countries-header">
        <div>
          <span className="section-label">
            🌎 WORLD DATABASE
          </span>

          <h2>Explore Countries</h2>

          <p>
            Search and discover countries from around the world.
          </p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span>🌍</span>
            <div>
              <strong>{countries.length}</strong>
              <small>Total Countries</small>
            </div>
          </div>

          <div className="stat-card visited-stat">
            <span>❤️</span>
            <div>
              <strong>{visitedCountries.length}</strong>
              <small>Visited</small>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-container">
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Result */}
      <div className="result-info">
        Showing <strong>{filteredCountries.length}</strong>{" "}
        countries
      </div>

      {/* Countries Grid */}
      <div className="countries">
        {filteredCountries.map((country) => (
          <Country
            key={country.ccn3.ccn3}
            handleVisitedCountry={handleVisitedCountry}
            country={country}
          />
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="no-results">
          <span>🌍</span>
          <h2>No country found</h2>
          <p>Try searching with a different country name.</p>
        </div>
      )}
    </section>
  );
}

