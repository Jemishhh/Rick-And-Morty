import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import './index.css';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
