import { WalletProvider, Baggageprovider, PopUpProvider } from 'core';
import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sample2, Gnb, ShopPage } from 'screens';

function App() {
  return (
    <WalletProvider>
      <PopUpProvider>
        <Baggageprovider>
          <Router>
            <Gnb />
            <Routes>
              <Route path="/mabinogi_peddler" element={<ShopPage />} />
              <Route path="/page02" element={<Sample2 />} />
            </Routes>
          </Router>
        </Baggageprovider>
      </PopUpProvider>
    </WalletProvider>
  );
}
export default App;