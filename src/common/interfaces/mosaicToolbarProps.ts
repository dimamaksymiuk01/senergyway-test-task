import { CompanyId } from '@/common/types';

export interface MosaicToolbarProps {
  currentCompanies: CompanyId[];
  activeWindows: CompanyId[];
  fullScreenWindow: CompanyId | null;
  restoreWindow: (id: CompanyId) => void;
  exitFullScreen: () => void;
  resetLayout: () => void;
  isMobile: boolean;
}
