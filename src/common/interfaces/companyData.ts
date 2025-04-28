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
  sector: string;
  industryCategory: string;
  industryGroup: string;
  firstStockPriceDate: string;
  lastStockPriceDate: string;
  legacySector: string;
  legacyIndustryCategory: string;
  legacyIndustryGroup: string;
  mosaicPositioning?: {
    defaultVisible?: boolean;
    initialOrder?: number;
    zIndex?: number;
  };
}
