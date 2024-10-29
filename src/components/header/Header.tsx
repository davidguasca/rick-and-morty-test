import './Header.css';
import Search from '../search/Search';

interface HeaderProps {
    onSearch: (searchTerm: string) => void; // Define la propiedad onSearch
  }

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="header-title">
          Rick and Morty Wiki for Digital Ware
        </a>
        <Search onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
