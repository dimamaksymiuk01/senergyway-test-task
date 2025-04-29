import { FC, useState, useEffect, useMemo } from 'react';
import { X, Maximize, Minimize, TextSelect } from 'lucide-react';
import { CompanyWindowControlsProps } from '@/common/interfaces';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/common/components';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useCompanies } from '@/common/contexts/CompaniesContext.tsx';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export const CompanyWindowControls: FC<CompanyWindowControlsProps> = ({
  id,
  fullScreenWindow,
  closeWindow,
  enterFullScreen,
  exitFullScreen,
  onVisibleFieldsChange,
}) => {
  const { companiesData } = useCompanies();

  const companyInfoFields = useMemo(() => {
    const allFields = new Set<string>();

    if (!companiesData) return [];

    const firstCompanyId = Object.keys(companiesData)[0];
    const firstCompany = companiesData[firstCompanyId];

    if (!firstCompany) return [];

    Object.keys(firstCompany).forEach((key) => {
      if (key !== 'mosaicPositioning') {
        allFields.add(key);
      }
    });

    return Array.from(allFields);
  }, [companiesData]);

  const [visibleFields, setVisibleFields] = useState<Record<string, Checked>>({});

  useEffect(() => {
    const initialState: Record<string, Checked> = {};
    companyInfoFields.forEach((field) => {
      initialState[field] = true;
    });
    setVisibleFields(initialState);

    if (onVisibleFieldsChange) {
      onVisibleFieldsChange(id, companyInfoFields);
    }
  }, [companyInfoFields, id]);

  const handleFieldChange = (field: string, checked: Checked) => {
    setVisibleFields((prev) => {
      const newState = {
        ...prev,
        [field]: checked,
      };

      if (onVisibleFieldsChange) {
        const fields = Object.entries(newState)
          .filter(([_, isVisible]) => isVisible)
          .map(([field]) => field);

        onVisibleFieldsChange(id, fields);
      }

      return newState;
    });
  };

  return (
    <>
      <DropdownMenu key='info-dropdown'>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <TextSelect size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-64'>
          <DropdownMenuLabel>Видимі поля</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {companyInfoFields.map((field) => (
            <DropdownMenuCheckboxItem
              key={field}
              checked={visibleFields[field]}
              onCheckedChange={(checked) => handleFieldChange(field, checked)}
            >
              {field}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {fullScreenWindow === id ? (
        <Button key='minimize' variant='outline' size='icon' onClick={exitFullScreen}>
          <Minimize size={16} />
        </Button>
      ) : (
        <Button
          key='expand'
          variant='outline'
          size='icon'
          onClick={() => enterFullScreen(id)}
        >
          <Maximize size={16} />
        </Button>
      )}

      <Button key='close' variant='outline' size='icon' onClick={() => closeWindow(id)}>
        <X size={16} />
      </Button>
    </>
  );
};
