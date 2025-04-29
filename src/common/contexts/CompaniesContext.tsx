import { createContext, useContext, ReactNode, FC, useState, useEffect } from 'react';
import { CompanyData } from '@/common/interfaces';

interface CompaniesContextType {
  companiesData: { [ticker: string]: CompanyData };
  isLoading: boolean;
  error: string | null;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

interface CompaniesProviderProps {
  children: ReactNode;
}

export const CompaniesProvider: FC<CompaniesProviderProps> = ({ children }) => {
  const [companiesData, setCompaniesData] = useState<{ [ticker: string]: CompanyData }>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompaniesData = async () => {
    try {
      const response = await fetch('http://localhost:5001/companies');
      if (!response.ok) {
        throw new Error('Помилка завантаження даних');
      }
      const data = await response.json();

      const companiesObject = data.reduce(
        (acc: { [ticker: string]: CompanyData }, company: CompanyData) => {
          acc[company.ticker] = company;
          return acc;
        },
        {},
      );

      setCompaniesData(companiesObject);
    } catch (err: any) {
      setError(err.message || 'Не вдалося завантажити дані');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  return (
    <CompaniesContext.Provider value={{ companiesData, isLoading, error }}>
      {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};
