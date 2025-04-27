import { FC } from 'react';
import { companiesDataInfo } from '@/common/constants';
import { MosaicToolbarProps } from '@/common/interfaces';

export const MosaicToolbar: FC<MosaicToolbarProps> = ({
  currentCompanies,
  activeWindows,
  fullScreenWindow,
  restoreWindow,
  exitFullScreen,
  resetLayout,
  isMobile,
}) => {
  const closedWindows = currentCompanies.filter((id) => !activeWindows.includes(id));

  return (
    <div className='bg-gray-100 p-2 flex flex-col md:flex-row md:justify-between'>
      <div className='flex-grow'>
        <div className='flex flex-wrap gap-2 mb-2'>
          {closedWindows.map((id) => (
            <button
              key={id}
              className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm md:text-base'
              onClick={() => restoreWindow(id)}
            >
              Відкрити {companiesDataInfo[id].ticker}
            </button>
          ))}

          {fullScreenWindow && (
            <button
              className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm md:text-base'
              onClick={exitFullScreen}
            >
              Вийти з повноекранного режиму
            </button>
          )}
        </div>
      </div>
      <div className='flex justify-between gap-2'>
        {!isMobile && (
          <button
            className='px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 whitespace-nowrap text-sm md:text-base'
            onClick={resetLayout}
          >
            Скинути розміщення
          </button>
        )}
      </div>
    </div>
  );
};
