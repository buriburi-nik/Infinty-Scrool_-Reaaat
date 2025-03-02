
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Gallery from './components/Gallery';
import ImageDetail from './components/ImageDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo">GeekGallery</div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
        </header>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/images/:id" element={<ImageDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;