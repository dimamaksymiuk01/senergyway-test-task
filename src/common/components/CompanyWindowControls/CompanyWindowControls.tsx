import { FC, useState, useEffect } from 'react';
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
import { companiesDataInfo } from '@/common/constants';

type Checked = DropdownMenuCheckboxItemProps['checked'];

const getCompanyInfoFields = () => {
  const allFields = new Set<string>();

  const firstCompanyId = Object.keys(companiesDataInfo)[0];
  const firstCompany = companiesDataInfo[firstCompanyId];

  Object.keys(firstCompany).forEach((key) => {
    if (key !== 'mosaicPositioning') {
      allFields.add(key);
    }
  });

  return Array.from(allFields);
};

export const CompanyWindowControls: FC<CompanyWindowControlsProps> = ({
  id,
  fullScreenWindow,
  closeWindow,
  enterFullScreen,
  exitFullScreen,
  onVisibleFieldsChange,
}) => {
  const companyInfoFields = getCompanyInfoFields();

  const [visibleFields, setVisibleFields] = useState<Record<string, Checked>>(() => {
    const initialState: Record<string, Checked> = {};
    companyInfoFields.forEach((field) => {
      initialState[field] = true;
    });
    return initialState;
  });

  useEffect(() => {
    if (onVisibleFieldsChange) {
      const fields = companyInfoFields.filter((field) => field !== 'mosaicPositioning');
      onVisibleFieldsChange(id, fields);
    }
  }, []);

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

  if (fullScreenWindow === id) {
    return [
      <Button key='minimize' variant='outline' size='icon' onClick={exitFullScreen}>
        <Minimize size={16} />
      </Button>,
    ];
  }

  return [
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
    </DropdownMenu>,
    <Button
      key='expand'
      variant='outline'
      size='icon'
      onClick={() => enterFullScreen(id)}
    >
      <Maximize size={16} />
    </Button>,
    <Button key='close' variant='outline' size='icon' onClick={() => closeWindow(id)}>
      <X size={16} />
    </Button>,
  ];
};
