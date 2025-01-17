import React, {useState} from 'react';
import { WalletProvider, BaggageProvider, PopUpProvider, LoadingProvider } from 'core';
import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sample2, Gnb, ShopPage, MapPage } from 'screens';

function App() {
  const [shopName, setShopName] = useState('')

  const handleGetName = (nm) => {
    setShopName(nm)
  }
  return (
    <div id="container">
      <Router>
        <WalletProvider>
          <PopUpProvider>
            <BaggageProvider>
              <LoadingProvider>
                <Gnb />
                <Routes>
                  <Route path="/mabinogi_peddler" element={<ShopPage shopNm={null}/>} />
                  <Route path="/map-page" element={<MapPage sendNpcName={handleGetName} />} />
                </Routes>
              </LoadingProvider>
            </BaggageProvider>
          </PopUpProvider>
        </WalletProvider>
      </Router>
      </div>
  );
}
export default App;