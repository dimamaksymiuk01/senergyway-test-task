export interface CompanyData {
  ticker: string;
  name: string;
  legalName: string;
  stockExchange: string;
  shortDescription: string;
  longDescription: string;
  web: string;
  businessAddress: string;
  businessPhone: string;
  entityLegalForm: string;
  latestFilingDate: string;
  incCountry: string;
  employees: number;
  mosaicPositioning?: {
    defaultVisible?: boolean;
    initialOrder?: number;
    zIndex?: number;
  };
}
