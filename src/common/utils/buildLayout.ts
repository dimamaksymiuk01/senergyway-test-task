import { CompanyId } from '@/common/types';
import { MosaicNode } from 'react-mosaic-component';

export const buildLayout = (
  companies: CompanyId[],
  isMobile: boolean,
): MosaicNode<CompanyId> => {
  if (companies.length === 1) return companies[0];
  if (companies.length === 2) {
    return {
      direction: isMobile ? 'column' : 'row',
      first: companies[0],
      second: companies[1],
      splitPercentage: 50,
    };
  }

  const mid = Math.floor(companies.length / 2);
  return {
    direction: companies.length > 4 || isMobile ? 'column' : 'row',
    first: buildLayout(companies.slice(0, mid), isMobile),
    second: buildLayout(companies.slice(mid), isMobile),
    splitPercentage: (mid / companies.length) * 100,
  };
};
