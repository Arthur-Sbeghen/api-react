import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";
import Nav from "./components/nav";
import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectPokemon = (pokemonData) => {
    setSelectedPokemon(pokemonData);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  const randomPokemon = () => {
    let randomId;
    
    if (Math.random() < 0.9) {
     randomId = Math.floor(Math.random() * 1025) + 1;
    } else {
      randomId = Math.floor(Math.random() * (10277 - 10001 + 1)) + 10001;
    }
  
    setSearchTerm(String(randomId));
    setSelectedPokemon(null);
  };

  return (
    <>
      <Header />
      <Main>
        {selectedPokemon ? (
          <Pokemon pokemon={selectedPokemon} onBack={handleBackToList} />
        ) : (
          <>
            <Nav
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm} 
              randomPokemon={randomPokemon}
            />
            <Pokedex
              searchTerm={searchTerm}
              onSelectPokemon={handleSelectPokemon}
            />
          </>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default App;
