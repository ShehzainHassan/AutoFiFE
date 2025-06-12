export interface Vehicle {
  id: number;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  status: string;
}

export interface VehicleListResult {
  totalCount: number;
  gearboxCounts: Record<string, number>;
  colorCounts: Record<string, number>;
  vehicles: Vehicle[];
}

export interface VehicleFeatures {
  make: string;
  model: string;
  year: number;
  features: {
    drivetrain: {
      type: string;
      transmission: string;
    };
    engine: {
      type: string;
      size: string | null;
      horsepower: number;
      torqueFtLBS: number | null;
      torqueRPM: number | null;
      valves: number | null;
      camType: string | null;
    };
    fuelEconomy: {
      fuelTankSize: number | null;
      combinedMPG: number;
      cityMPG: number;
      highwayMPG: number;
      cO2Emissions: number;
    };
    performance: {
      zeroTo60MPH: number;
    };
    measurements: {
      doors: number;
      maximumSeating: number;
      heightInches: number;
      widthInches: number;
      lengthInches: number;
      wheelbaseInches: number;
      groundClearance: number;
      cargoCapacityCuFt: number | null;
      curbWeightLBS: number;
    };
    options: string[];
  };
}

export interface VehicleFilter {
  make: string | null;
  model: string | null;
  startPrice: number | null;
  endPrice: number | null;
  mileage: number | null;
  startYear: number | null;
  endYear: number | null;
  gearbox: string | null;
  selectedColors: string | null;
  status: string | null;
}
