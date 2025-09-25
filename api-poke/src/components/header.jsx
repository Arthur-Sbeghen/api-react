import "../components/css/header.css";

const Header = () => {
  return (
    <header className="header">
      <a href="./pages/home.html" className="header-link">
        <div className="header-logo">
          <img
            src="../assets/pokedex.png"
            alt="Logo Pokedex"
            className="header-logo"
          />
        </div>
        <h1 className="header-title">Pokédex</h1>
      </a>
    </header>
  );
};

export default Header;
