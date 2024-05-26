const cells = document.querySelectorAll("div.cell");

// Funkcja od adriana do losowego wybierania graca
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

let players = ["O", "X"];
currentPlayer = shuffle(players)[0]; // Wybiera losowego przy pomocy funkcji shuffle

const currentPlayerElement = document.getElementById("currentPlayer");
const winCount1Element = document.getElementById("winCount1");
const winCount2Element = document.getElementById("winCount2");

let winCount1 = 0;
let winCount2 = 0;

function updatePlayerShowing() {
  currentPlayerElement.textContent = currentPlayer; // Aktualizuje wyświetlanie tury na dole planszy
}

function updateWinCount() {
  winCount1Element.textContent = winCount1;
  winCount2Element.textContent = winCount2;
}

function checkWin() {   // Win case które zwracają true lub false, gdy 3 pola obok siebie są zajęte
  const c0 = document.querySelector("div.cell[data-index='0']").innerHTML;
  const c1 = document.querySelector("div.cell[data-index='1']").innerHTML;
  const c2 = document.querySelector("div.cell[data-index='2']").innerHTML;
  const c3 = document.querySelector("div.cell[data-index='3']").innerHTML;
  const c4 = document.querySelector("div.cell[data-index='4']").innerHTML;
  const c5 = document.querySelector("div.cell[data-index='5']").innerHTML;
  const c6 = document.querySelector("div.cell[data-index='6']").innerHTML;
  const c7 = document.querySelector("div.cell[data-index='7']").innerHTML;
  const c8 = document.querySelector("div.cell[data-index='8']").innerHTML;

  if (c0 && c0 === c1 && c1 === c2) return true;
  if (c3 && c3 === c4 && c4 === c5) return true;
  if (c6 && c6 === c7 && c7 === c8) return true;
  if (c0 && c0 === c3 && c3 === c6) return true;
  if (c1 && c1 === c4 && c4 === c7) return true;
  if (c2 && c2 === c5 && c5 === c8) return true;
  if (c2 && c2 === c4 && c4 === c6) return true;
  if (c0 && c0 === c4 && c4 === c8) return true;
  return false;
}

function checkDraw() {        // Sprawdza czy komórka jest pusta zwraca true kiedy komórka nie jest zajęta
  for (let cell of cells) {
    if (!cell.innerHTML) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  cells.forEach(cell => cell.innerHTML = "");  // Ustawia każde pole puste 
  currentPlayer = shuffle(players)[0]; // Wybiera losowego gracza
  updatePlayerShowing(); // Aktualizuje wyświetlanie tury na dole planszy
}

for (let cell of cells) {
  // Dla każdej komórki
  cell.addEventListener("click", () => { // Nasłuchiwanie kliknięcia 
    if (cell.innerHTML) return;
    cell.innerHTML = currentPlayer;

    if (checkWin()) {
      alert(`${currentPlayer} have won!`);
      if (currentPlayer === "O") {
        winCount1++; // jezeli 0 wygral iteruje po wygranej 0
      } else { //else iteruje po 2 graczy czyli X
        winCount2++;
      }
      updateWinCount(); // Aktualizuje liczniki wygranych graczy
      setTimeout(resetGame, 600); // Funkcja reset game po każdym sprawdzeniu
    } else if (checkDraw()) {
      alert("Tie!");
      setTimeout(resetGame, 600); 
    } else {
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      updatePlayerShowing(); 
    }
  });
}

updatePlayerShowing(); 
updateWinCount(); // Aktualizuje liczniki wygranych graczy na początku gry
