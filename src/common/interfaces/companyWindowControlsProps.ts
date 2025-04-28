import { CompanyId } from '@/common/types';

export interface CompanyWindowControlsProps {
  id: CompanyId;
  fullScreenWindow: CompanyId | null;
  closeWindow: (id: CompanyId) => void;
  enterFullScreen: (id: CompanyId) => void;
  exitFullScreen: () => void;
  onVisibleFieldsChange?: (id: CompanyId, fields: string[]) => void;
}
