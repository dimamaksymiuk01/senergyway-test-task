import './App.css';
import './normalize.css';

import { Routes, Route } from 'react-router-dom';
import { routes } from './routes.tsx';

function App() {
  return (
    <div>
      {/*<nav className='flex gap-4 p-4 bg-gray-200'>*/}
      {/*  <Link to='/'>Home</Link>*/}
      {/*  <Link to='/dashboard'>Dashboard</Link>*/}
      {/*</nav>*/}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
