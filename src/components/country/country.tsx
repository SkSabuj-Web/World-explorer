import { useState } from "react";
import type { countryType } from "../../type";
import "./country.css";

export interface CountryProps {
  country: countryType;
  handleVisitedCountry: (country: countryType) => void;
}

export default function Country({
  country,
  handleVisitedCountry,
}: CountryProps) {
  const [visited, setVisited] = useState(false);

  const handleVisited = () => {
    setVisited(!visited);
    handleVisitedCountry(country);
  };

  return (
    <article className={`country ${visited ? "country-visited" : ""}`}>

      {/* Flag */}
      <div className="flag-container">
        <img
          src={country.flags.flags.png}
          alt={
            country.flags.flags.alt ||
            `${country.name.common} flag`
          }
        />

        {visited && (
          <span className="visited-badge">
            ✓ Visited
          </span>
        )}
      </div>

      {/* Country Information */}
      <div className="country-content">

        <div className="country-title">
          <div>
            <span className="country-code">
              {country.ccn3.ccn3}
            </span>

            <h2>{country.name.common}</h2>
          </div>

          <span className="globe-icon">🌎</span>
        </div>

        <div className="country-info">

          {/* Capital */}
          <div className="info-item">
            <span>🏛️</span>

            <div>
              <small>Capital</small>

              <strong>
                {country.capital?.capital?.[0] || "N/A"}
              </strong>
            </div>
          </div>

          {/* Population */}
          <div className="info-item">
            <span>👥</span>

            <div>
              <small>Population</small>

              <strong>
                {country.population.population.toLocaleString()}
              </strong>
            </div>
          </div>

        </div>

        <button
          className={`visit-button ${
            visited ? "visited-button" : ""
          }`}
          onClick={handleVisited}
        >
          {visited ? "✓ Visited" : "＋ Mark as Visited"}
        </button>

      </div>
    </article>
  );
}