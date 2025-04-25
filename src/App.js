import { GlobalProvider } from 'core';
import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Gnb, ShopPage, MapPage, RoadPage, TestPage } from 'screens';

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div id="container">
            <Gnb />
            <Routes>
              <Route path="/mabinogi_peddler" element={<MapPage/>} />
              <Route path="/shop" element={<ShopPage/>} />
              <Route path="/road-page" element={<RoadPage/>} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}
export default App;