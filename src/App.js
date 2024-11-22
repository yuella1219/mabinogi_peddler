import '../src/assets/css/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Sample2, Gnb} from './public';
import { ShopPage } from './shop';

function App() {
  return (
    <Router>
      <Gnb />
      <Routes>
        <Route path="/public" element={<ShopPage />} />
        <Route path="/page02" element={<Sample2 />} />
      </Routes>
    </Router>
  );
}
export default App;