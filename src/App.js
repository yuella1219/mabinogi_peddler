import './assets/css/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sample2, Gnb, ShopPage } from 'screens';

function App() {
  return (
    <Router>
      <Gnb />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/page02" element={<Sample2 />} />
      </Routes>
    </Router>
  );
}
export default App;