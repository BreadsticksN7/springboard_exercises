import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import VendingNav from './VendingNav';
import VendingHome from './VendingHome';
import VendingDrink from './VendingDrink';
import VendingEntree from './VendingEntree';
import VendingSnack from './VendingSnack';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <VendingNav />
        <Routes>
          <Route exact path="/" element={<VendingHome />} />
          <Route exact path="/entree" element={<VendingEntree />} />
          <Route exact path="/drink" element={<VendingDrink />} />
          <Route exact path="/snack" element={<VendingSnack />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
