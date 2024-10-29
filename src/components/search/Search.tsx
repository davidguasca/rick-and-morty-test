import React, { useState } from 'react';
import './Search.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch } : SearchBarProps ) => {

  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length < 3) {
      setError('Debe contener al menos 3 caracteres para buscar un personaje.');
    } else {
      setError('');
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar personaje..."
        className="search-input"
      />
      <button type="submit" className="search-button">Buscar</button>
      {error && <br></br> && <p className="error-message">{error}</p>}
    </form>
  );
};

export default SearchBar;
