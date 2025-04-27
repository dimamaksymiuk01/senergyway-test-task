import { FC } from 'react';
import { Mosaic, MosaicWindow, MosaicBranch } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { CompanyId } from '@/common/types';
import { COMPANIES_PER_PAGE, companiesDataInfo } from '@/common/constants';
import { useMediaQuery, useMosaicLayout, usePagination } from '@/common/hooks';
import {
  CompanyInfoPanel,
  CompanyWindowControls,
  MobileCompanyView,
  MosaicToolbar,
  Pagination,
} from '@/common/components';

export const CompanyMosaic: FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    currentPage,
    totalPages,
    currentItems: currentCompanies,
    handlePrevPage,
    handleNextPage,
  } = usePagination({ itemsPerPage: COMPANIES_PER_PAGE });

  const {
    layout,
    activeWindows,
    fullScreenWindow,
    closeWindow,
    restoreWindow,
    enterFullScreen,
    exitFullScreen,
    resetLayout,
    onChangeLayout,
  } = useMosaicLayout({ currentCompanies, isMobile });

  const renderWindow = (id: CompanyId, path: MosaicBranch[]) => {
    const company = companiesDataInfo[id];
    const title = `Company info: ${company.ticker}`;

    return (
      <MosaicWindow<CompanyId>
        path={path}
        title={title}
        toolbarControls={
          <CompanyWindowControls
            id={id}
            fullScreenWindow={fullScreenWindow}
            closeWindow={closeWindow}
            enterFullScreen={enterFullScreen}
            exitFullScreen={exitFullScreen}
          />
        }
        draggable={!isMobile}
        createNode={() => id}
      >
        <CompanyInfoPanel companyId={id} />
      </MosaicWindow>
    );
  };

  return (
    <>
      <MosaicToolbar
        currentCompanies={currentCompanies}
        activeWindows={activeWindows}
        fullScreenWindow={fullScreenWindow}
        restoreWindow={restoreWindow}
        exitFullScreen={exitFullScreen}
        resetLayout={resetLayout}
        isMobile={isMobile}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />

      <div className='flex flex-col h-screen'>
        <div className='flex-grow relative'>
          {isMobile ? (
            <MobileCompanyView currentCompanies={currentCompanies} />
          ) : layout ? (
            <Mosaic<CompanyId>
              renderTile={(id, path) => renderWindow(id, path)}
              value={layout}
              onChange={onChangeLayout}
              className='mosaic-blueprint-theme'
              zeroStateView={
                <div className='flex items-center justify-center h-full text-gray-400'>
                  Додайте компанію для відображення
                </div>
              }
              resize={{
                minimumPaneSizePercentage: 10,
              }}
              onRelease={() => {
                if (layout && activeWindows.length > 0) {
                }
              }}
            />
          ) : (
            <div className='flex items-center justify-center h-full'>
              <h1 className='text-3xl font-bold text-gray-400'>No Data</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
