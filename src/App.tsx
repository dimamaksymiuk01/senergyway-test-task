import './normalize.css';
import { CompaniesProvider } from '@/common/contexts/CompaniesContext.tsx';
import { Dashboard } from '@/pages';

function App() {
  return (
    <>
      <CompaniesProvider>
        <Dashboard />
      </CompaniesProvider>
      ;
    </>
  );
}

export default App;
