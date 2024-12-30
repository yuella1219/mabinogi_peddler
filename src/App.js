import { WalletProvider, BaggageProvider, PopUpProvider } from 'core';
import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sample2, Gnb, ShopPage } from 'screens';

function App() {
  return (
    <div id="container">
      <WalletProvider>
        <PopUpProvider>
          <BaggageProvider>
            <Router>
              <Routes>
                <Route path="/mabinogi_peddler" element={<ShopPage />} />
                <Route path="/page02" element={<Sample2 />} />
              </Routes>
            </Router>
          </BaggageProvider>
        </PopUpProvider>
      </WalletProvider>
    </div>
  );
}
export default App;