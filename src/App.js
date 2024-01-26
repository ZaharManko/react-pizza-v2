import './scss/app.scss';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Card from './pages/Cart';
import { createContext } from 'react';
export const searchContext = createContext();
function App() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/cart' element={<Card />} />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
