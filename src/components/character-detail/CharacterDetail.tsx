import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CharacterDetail.css';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  image: string;
  gender: string;
  location: {
    name: string;
  };
  type: string;
}

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character:", error);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!character) {
    return <div className="error">Character not found</div>;
  }

  return (
    <div className="character-detail-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        Back to List
      </button>
      <div className="character-detail-card">
        <img
          src={character.image}
          alt={character.name}
          className="character-image"
        />
        <div className="character-info">
          <h1 className="character-name">{character.name}</h1>
          <div className="character-details-grid">
            <div className="detail-item">
              <p className="detail-label">Status:</p>
              <p className="detail-value">{character.status}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Species:</p>
              <p className="detail-value">{character.species}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Gender:</p>
              <p className="detail-value">{character.gender}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Origin:</p>
              <p className="detail-value">{character.origin.name}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Location:</p>
              <p className="detail-value">{character.location.name}</p>
            </div>
            {character.type && (
              <div className="detail-item">
                <p className="detail-label">Type:</p>
                <p className="detail-value">{character.type}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
