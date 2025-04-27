import { CompanyId } from '@/common/types';
import { FC } from 'react';
import { companiesDataInfo } from '@/common/constants';

export const CompanyInfoPanel: FC<{ companyId: CompanyId }> = ({ companyId }) => {
  const company = companiesDataInfo[companyId];

  return (
    <div className='p-4 h-full overflow-auto'>
      <div className='mb-4'>
        <span className='font-bold mr-2'>ticker</span>
        <span>{company.ticker}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Name:</span>
        <span>{company.name}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Legal name:</span>
        <span>{company.legalName}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Stock exchange:</span>
        <span>{company.stockExchange}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Short description:</span>
        <span>{company.shortDescription}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Web:</span>
        <span>{company.web}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Business address:</span>
        <span>{company.businessAddress}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Business phone:</span>
        <span>{company.businessPhone}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Entity legal form:</span>
        <span>{company.entityLegalForm}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Latest filing date:</span>
        <span>{company.latestFilingDate}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Inc country:</span>
        <span>{company.incCountry}</span>
      </div>

      <div className='mb-4'>
        <span className='font-bold mr-2'>Employees:</span>
        <span>{company.employees}</span>
      </div>
    </div>
  );
};
