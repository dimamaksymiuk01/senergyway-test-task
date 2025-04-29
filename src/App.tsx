import './normalize.css';
import { CompanyMosaic } from '@/modules';
import { CompaniesProvider } from '@/common/contexts/CompaniesContext.tsx';

function App() {
  return (
    <>
      <CompaniesProvider>
        <CompanyMosaic />
      </CompaniesProvider>
      ;
    </>
  );
}

export default App;
