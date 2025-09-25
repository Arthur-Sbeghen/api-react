import "../components/css/header.css";
import PokedexLogo from "../assets/pokedex.png";

const Header = () => {
  return (
    <header className="header">
        <div className="header-logo">
          <img
            src={PokedexLogo}
            alt="Logo Pokedex"
            className="header-logo"
          />
        </div>
        <h1 className="header-title">Pokédex</h1>
    </header>
  );
};

export default Header;
