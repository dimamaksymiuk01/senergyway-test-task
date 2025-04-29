import { CompanyId } from '@/common/types';
import { CompanyData } from '@/common/interfaces';

export const getVisibleCompanies = (
  companies: CompanyId[],
  companiesData: Record<CompanyId, CompanyData>,
) => {
  return companies?.filter(
    (id) => companiesData?.[id]?.mosaicPositioning?.defaultVisible !== false,
  );
};
