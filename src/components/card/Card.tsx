import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

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

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div 
      className="character-card cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <img src={character.image} alt={character.name} />
      <div className="character-info">
        <h3>{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Origin: {character.origin.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;