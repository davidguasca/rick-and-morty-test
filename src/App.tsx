import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import CharacterCard from './components/card/Card';
import Pagination from './components/pagination/Pagination';
import CharacterDetail from './components/character-detail/CharacterDetail';
import './App.css';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  image: string;
}

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.length < 3) return;
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.results.length / 6));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentCharacters = characters.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <div className="character-list">
                  {currentCharacters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            } 
          />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;