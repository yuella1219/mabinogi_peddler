import '../src/assets/css/App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Sample, Sample2} from './components';

function App() {
  return (
    <Router>
      <nav>
        <Link className="nav-btn" to="/public">0101</Link>
        <Link className="nav-btn" to="page02">0202</Link>
      </nav>

      <Routes>
        <Route path="/public" element={<Sample />} />
        <Route path="/page02" element={<Sample2 />} />
      </Routes>
    </Router>
  );
}

    // {/* <div className="App">
    //   <Sample />
    // </div> */}
export default App;