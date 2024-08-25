import * as readline from 'readline';
import { Game } from './game';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise(resolve => rl.question(question, resolve));
};

const playGame = async (): Promise<void> => {
  const numPlayers: number = parseInt(await askQuestion('How many players? '), 10);
  if (Number.isNaN(numPlayers) || numPlayers < 2) {
    console.log('The game requires two or more players.');
    rl.close();
    return;
  }

  const game: Game = new Game(numPlayers);
  console.log('Starting the Pig game...');

  while (true) {
    const currentPlayerIndex = game.currentPlayerIndex;
    const currentPlayer = game['players'][currentPlayerIndex];
    console.log(`\nPlayer ${currentPlayerIndex + 1}'s turn. Current score: ${currentPlayer.getScore()}`);

    let playerTurn = true;
    while (playerTurn) {
        const action = (await askQuestion('Press "r" to roll or "s" to stop rolling: ')).trim().toLowerCase();

      if (action === 'r') {
        playerTurn = game.rollDice(); // Returns true if player can roll again, false if the turn ends
      } else if (action === 's') {
        game.hold();
        playerTurn = false; // End player's turn
      } else {
        console.log('Invalid input. Please enter "r" to roll or "s" to stop.');
      }
    }

    const winner = game.getWinner();
    if (winner) {
      console.log(`\nPlayer ${game['players'].indexOf(winner) + 1} wins with a score of ${winner.getScore()}!`);
      break;
    }
  }

  rl.close();
}

playGame();
