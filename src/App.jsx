import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import ImageDetail from './components/ImageDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header / Navbar */}
        <header className="header">
          <div className="logo">GeekGallery</div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
        </header>

        <Routes>
          {/* Main Gallery View */}
          <Route path="/" element={<Gallery />} />
          {/* Detail View */}
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
