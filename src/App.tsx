import './normalize.css';
import { CompaniesProvider } from '@/common/contexts/CompaniesContext.tsx';
import { CompanyMosaic } from '@/modules';

function App() {
  return (
      <CompaniesProvider>
        <CompanyMosaic />
      </CompaniesProvider>
  );
}

export default App;
