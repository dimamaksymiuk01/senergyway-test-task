import { FC, useEffect, useState } from 'react';
import { companiesDataInfo } from '@/common/constants';
import { MosaicToolbarProps } from '@/common/interfaces';
import { Button } from '@/common/components';

export const MosaicToolbar: FC<MosaicToolbarProps> = ({
  currentCompanies,
  activeWindows,
  fullScreenWindow,
  restoreWindow,
  resetLayout,
  isMobile,
}) => {
  const [closedWindows, setClosedWindows] = useState<string[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (currentCompanies && activeWindows) {
      const updatedClosedWindows = currentCompanies.filter(
        (id) => !activeWindows.includes(id),
      );
      setClosedWindows(updatedClosedWindows);
      setIsDataReady(true);
    }
  }, [currentCompanies, activeWindows]);

  const shouldShowButtons = closedWindows.length > 0 || fullScreenWindow;

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          {!isMobile && (
            <Button variant={'outline'} onClick={resetLayout}>
              Скинути розміщення
            </Button>
          )}
        </div>
        <div className='flex gap-3'>
          {isDataReady &&
            shouldShowButtons &&
            closedWindows.map((id) => (
              <Button key={id} variant={'secondary'} onClick={() => restoreWindow(id)}>
                Відкрити {companiesDataInfo[id].ticker}
              </Button>
            ))}
        </div>
      </div>
    </>
  );
};
