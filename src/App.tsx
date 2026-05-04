import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homeone from './components/Homeone';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Homeone />} />
        
        {/* Dynamic Product Page Route */}
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;