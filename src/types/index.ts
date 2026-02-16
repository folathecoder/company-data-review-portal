export interface Director {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Location {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

export interface NAICSReference {
  vertical: string;
  subVerticals: string[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SectionStep {
  id: string;
  label: string;
  completed: boolean;
}
