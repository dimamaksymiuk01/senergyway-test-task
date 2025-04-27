import { MosaicNode } from 'react-mosaic-component';
import { CompanyId } from '@/common/types';

export interface UseMosaicLayoutProps {
  currentCompanies: CompanyId[];
  isMobile: boolean;
}

export interface UseMosaicLayoutResult {
  layout: MosaicNode<CompanyId> | null;
  previousLayout: MosaicNode<CompanyId> | null;
  activeWindows: CompanyId[];
  fullScreenWindow: CompanyId | null;
  isDragging: boolean;
  closeWindow: (id: CompanyId) => void;
  restoreWindow: (id: CompanyId) => void;
  enterFullScreen: (id: CompanyId) => void;
  exitFullScreen: () => void;
  resetLayout: () => void;
  onChangeLayout: (newNode: MosaicNode<CompanyId> | null) => void;
}
