import { companiesDataInfo } from '@/common/constants';
import { CompanyId } from '@/common/types';

export const applyWindowStyles = (companies: CompanyId[]) => {
  companies.forEach((id) => {
    const company = companiesDataInfo[id];
    const zIndex = company.mosaicPositioning?.zIndex;
    if (!zIndex) return;

    const windows = document.querySelectorAll(
      `[title="Company info: ${company.ticker}"]`,
    );
    windows.forEach((window) => {
      const parent = window.closest('.mosaic-window') as HTMLElement | null;
      if (parent) parent.style.zIndex = String(zIndex);
    });
  });
};
