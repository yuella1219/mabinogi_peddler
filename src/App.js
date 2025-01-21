import { GlobalProvider } from 'core';
import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Gnb, ShopPage, MapPage } from 'screens';

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div id="container">
            <Gnb />
            <Routes>
              <Route path="/mabinogi_peddler" element={<ShopPage/>} />
              <Route path="/map-page" element={<MapPage/>} />
            </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}
export default App;