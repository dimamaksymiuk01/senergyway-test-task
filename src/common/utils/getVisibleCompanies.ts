import { CompanyId } from '@/common/types';
import { companiesDataInfo } from '@/common/constants';

export const getVisibleCompanies = (companies: CompanyId[]) =>
  companies.filter(
    (id) => companiesDataInfo[id].mosaicPositioning?.defaultVisible !== false,
  );
