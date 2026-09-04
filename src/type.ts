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
      alt: string;
    };
  };

  population: {
    population: number;
  };

  capital: {
    capital: string[];
  };
}