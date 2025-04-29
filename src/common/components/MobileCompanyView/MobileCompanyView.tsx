import { FC } from 'react';
import { CompanyId } from '@/common/types';
import { CompanyInfoPanel } from '@/common/components/CompanyInfoPanel/CompanyInfoPanel';
import { useCompanies } from '@/common/contexts/CompaniesContext.tsx';

interface MobileCompanyViewProps {
  currentCompanies: CompanyId[];
  visibleFieldsMap?: Record<CompanyId, string[]>;
}

export const MobileCompanyView: FC<MobileCompanyViewProps> = ({
  currentCompanies,
  visibleFieldsMap = {},
}) => {
  const { companiesData } = useCompanies();

  return (
    <div className='flex flex-col gap-4 p-2'>
      {currentCompanies?.map((id) => (
        <div key={id} className='border rounded shadow-md bg-white overflow-hidden'>
          <div className='bg-gray-100 p-2 flex justify-between items-center'>
            <h3 className='font-medium'>
              Company info:{' '}
              {companiesData?.[id]?.ticker ? companiesData[id].ticker : 'N/A'}
            </h3>
          </div>
          <div className='p-4'>
            <CompanyInfoPanel companyId={id} visibleFields={visibleFieldsMap[id] ?? []} />
          </div>
        </div>
      ))}
    </div>
  );
};
