import { CompanyData } from '@/common/interfaces';

export const getCompanyInfoFields = (
  companiesData: Record<string, CompanyData> | null,
): (keyof CompanyData)[] => {
  const firstCompanyId = Object.keys(companiesData ?? {})[0];
  const firstCompany = companiesData?.[firstCompanyId];

  if (!firstCompany) return [];

  return Object.keys(firstCompany).filter(
    (key): key is keyof CompanyData => key !== 'mosaicPositioning',
  );
};
