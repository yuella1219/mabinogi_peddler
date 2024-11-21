import '../src/assets/css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Sample, Sample2, Gnb} from './components';

function App() {
  return (
    <Router>
      <Gnb />
      <Routes>
        <Route path="/public" element={<Sample />} />
        <Route path="/page02" element={<Sample2 />} />
      </Routes>
    </Router>
  );
}
export default App;