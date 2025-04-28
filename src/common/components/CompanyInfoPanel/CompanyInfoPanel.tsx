import { FC } from 'react';
import { companiesDataInfo } from '@/common/constants';
import { CompanyId } from '@/common/types';

interface CompanyInfoPanelProps {
  companyId: CompanyId;
  visibleFields?: string[];
}

export const CompanyInfoPanel: FC<CompanyInfoPanelProps> = ({
  companyId,
  visibleFields,
}) => {
  const company = companiesDataInfo[companyId];

  const fieldsToShow =
    visibleFields || Object.keys(company).filter((key) => key !== 'mosaicPositioning');

  return (
    <div className='p-4 overflow-auto h-full'>
      <div className='grid grid-cols-1 gap-3'>
        {fieldsToShow.map((field) => {
          const value = company[field as keyof typeof company];

          return (
            <div key={field} className='border-b pb-2'>
              <div className='font-medium text-sm text-gray-500 mb-1'>{field}</div>
              <div className='text-base'>
                {typeof value === 'object' ? (
                  <pre className='text-xs overflow-auto'>
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  String(value)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
