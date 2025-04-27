import { FC } from 'react';
import { X, Maximize, Minimize } from 'lucide-react';
import { CompanyWindowControlsProps } from '@/common/interfaces';

export const CompanyWindowControls: FC<CompanyWindowControlsProps> = ({
  id,
  fullScreenWindow,
  closeWindow,
  enterFullScreen,
  exitFullScreen,
}) => {
  if (fullScreenWindow === id) {
    return [
      <button key='minimize' className='mosaic-default-control' onClick={exitFullScreen}>
        <Minimize size={16} />
      </button>,
      <button
        key='close'
        className='mosaic-default-control'
        onClick={() => closeWindow(id)}
      >
        <X size={16} />
      </button>,
    ];
  }

  return [
    <button
      key='expand'
      className='mosaic-default-control'
      onClick={() => enterFullScreen(id)}
    >
      <Maximize size={16} />
    </button>,
    <button
      key='close'
      className='mosaic-default-control'
      onClick={() => closeWindow(id)}
    >
      <X size={16} />
    </button>,
  ];
};
