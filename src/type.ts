export interface countryType {
  name: {
    common: string;
    official: string;
  };

  ccn3: {
    ccn3: string;
  };

  flags: {
    flags: {
      png: string;
      svg: string;
      alt?: string | null;
    };
  };

  population: {
    population: number;
  };

  capital?: {
    capital: string[];
  } | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isCountry(value: unknown): value is countryType {
  if (!isRecord(value)) {
    return false;
  }

  const name = value.name;
  const code = value.ccn3;
  const flags = value.flags;
  const population = value.population;
  const capital = value.capital;

  return (
    isRecord(name) &&
    typeof name.common === "string" &&
    typeof name.official === "string" &&
    isRecord(code) &&
    typeof code.ccn3 === "string" &&
    isRecord(flags) &&
    isRecord(flags.flags) &&
    typeof flags.flags.png === "string" &&
    typeof flags.flags.svg === "string" &&
    (flags.flags.alt === undefined ||
      flags.flags.alt === null ||
      typeof flags.flags.alt === "string") &&
    isRecord(population) &&
    typeof population.population === "number" &&
    (capital === undefined ||
      capital === null ||
      (isRecord(capital) &&
        Array.isArray(capital.capital) &&
        capital.capital.every(
          (item: unknown) => typeof item === "string"
        )))
  );
}