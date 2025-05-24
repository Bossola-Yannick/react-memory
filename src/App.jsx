import React, { useState, useEffect } from "react";
import Card from "./components/Cards/Cards.jsx";
import Button from "./components/Button/Button.jsx";
import "./App.css";

const images = [
  "biere.png",
  "cowboy.png",
  "dinosaure.png",
  "pirate.png",
  "poulet-roti.png",
  "xenomorphe.png",
];
// fonctiopn pour retourner un tableau aléatoire (mélange des carte)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  // lancement de la partie et remise à zéro des paramettres
  const startGame = () => {
    const newArray = shuffleArray([...images, ...images]).map(
      (image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false,
      })
    );
    setCards(newArray);
    setFlipped([]);
    setMatched([]);
    setGameStarted(true);
    setMoves(0);
    setGameWon(false);
  };
  // fonction qui gère le click sur les cartes
  const handleClick = (index) => {
    // vérification et impossible de joué ces condition (jeu pas lancé, pas retourne rplus de 2 cartes, retourné la même carte et si carte déjà retourné et match)
    if (
      !gameStarted ||
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].image)
    )
      return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    // phase de jeu
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      // plus 1 au compteur de coup
      setMoves((prev) => prev + 1);
      // vérification carte identique
      if (cards[first].image === cards[second].image) {
        setMatched((prev) => [...prev, cards[first].image]);
      }
      // retournement des carte si celle-ci ne sont pas identique
      setTimeout(() => {
        setFlipped([]);
      }, 600);
    }
  };
  // vérifictaion victoire
  useEffect(() => {
    if (matched.length === images.length) {
      setGameWon(true);
    }
  }, [matched]);
  return (
    <div className="memory-game">
      <Button onClick={startGame} className="start-button">
        {gameStarted ? "Redémarrer" : "Démarrer la partie"}
      </Button>
      {/* condition d'affichege message */}
      {gameStarted && (
        <div className="game-info">
          <p className="count">Coups joués : {moves}</p>
          {gameWon && (
            <p className="victory-message">
              Bravo ! Toutes les Poules sont retournées au poulailler en {moves}{" "}
              coups !
            </p>
          )}
        </div>
      )}
      <div className="card-grid">
        {cards.map((card, index) => {
          const isFlipped =
            flipped.includes(index) || matched.includes(card.image);
          return (
            <Card
              key={card.id}
              onClick={() => handleClick(index)}
              flipped={isFlipped}
              image={card.image}
            />
          );
        })}
      </div>
    </div>
  );
}
