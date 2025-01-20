import React, {useState, useEffect} from 'react';
import { WalletProvider, BaggageProvider, PopUpProvider, LoadingProvider } from 'core';
import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Gnb, ShopPage, MapPage } from 'screens';

function App() {
  const [shopName, setShopName] = useState('')

  // 맵에서 npc 데이터 받아오기
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
                  <Route path="/mabinogi_peddler" element={<ShopPage npcNm={shopName}/>} />
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