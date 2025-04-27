import { FC } from 'react';
import { CompanyId } from '@/common/types';
import { companiesDataInfo } from '@/common/constants';
import { CompanyInfoPanel } from '@/common/components/CompanyInfoPanel/CompanyInfoPanel';

interface MobileCompanyViewProps {
  currentCompanies: CompanyId[];
}

export const MobileCompanyView: FC<MobileCompanyViewProps> = ({ currentCompanies }) => {
  return (
    <div className='flex flex-col gap-4 p-2'>
      {currentCompanies.map((id) => (
        <div key={id} className='border rounded shadow-md bg-white overflow-hidden'>
          <div className='bg-gray-100 p-2 flex justify-between items-center'>
            <h3 className='font-medium'>Company info: {companiesDataInfo[id].ticker}</h3>
          </div>
          <div className='p-4'>
            <CompanyInfoPanel companyId={id} />
          </div>
        </div>
      ))}
    </div>
  );
};
