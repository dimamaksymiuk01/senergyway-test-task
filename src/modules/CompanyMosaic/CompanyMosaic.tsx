import { FC } from 'react';
import { Mosaic, MosaicWindow, MosaicBranch } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { CompanyId } from '@/common/types';
import { COMPANIES_PER_PAGE } from '@/common/constants';
import {
  useLocalStorage,
  useMediaQuery,
  useMosaicLayout,
  usePagination,
} from '@/common/hooks';
import {
  CompanyInfoPanel,
  CompanyWindowControls,
  MobileCompanyView,
  MosaicToolbar,
  Pagination,
} from '@/common/components';
import { useCompanies } from '@/common/contexts/CompaniesContext.tsx';
import { Spinner } from '@/common/components/Spinner/Spinner.tsx';

export const CompanyMosaic: FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { companiesData, isLoading } = useCompanies();

  const [companyVisibleFields, setCompanyVisibleFields] = useLocalStorage<
    Record<CompanyId, string[]>
  >('company-visible-fields', {});

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

  const handleVisibleFieldsChange = (companyId: CompanyId, fields: string[]) => {
    setCompanyVisibleFields((prev) => ({
      ...prev,
      [companyId]: fields,
    }));
  };

  const renderWindow = (id: CompanyId, path: MosaicBranch[]) => {
    const company = companiesData[id];
    const title = `Company info: ${company?.ticker}`;

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
            onVisibleFieldsChange={handleVisibleFieldsChange}
          />
        }
        draggable={!isMobile}
        createNode={() => id}
      >
        <CompanyInfoPanel companyId={id} visibleFields={companyVisibleFields[id]} />
      </MosaicWindow>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className='fixed inset-0 flex items-center justify-center bg-white/70 z-50'>
          <Spinner size={50} />
        </div>
      ) : (
        <>
          <div className='flex items-center p-2.5'>
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
          </div>

          <div className='flex flex-col h-screen'>
            <div className='flex-grow relative'>
              {isMobile ? (
                <MobileCompanyView
                  currentCompanies={currentCompanies}
                  visibleFieldsMap={companyVisibleFields}
                />
              ) : layout ? (
                <Mosaic<CompanyId>
                  renderTile={(id, path) => renderWindow(id, path)}
                  value={layout}
                  onChange={onChangeLayout}
                  className='mosaic-blueprint-theme'
                  resize={{
                    minimumPaneSizePercentage: 10,
                  }}
                  onRelease={() => {
                    if (layout && activeWindows.length > 0) {
                      // optional: do something here
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
      )}
    </>
  );
};
