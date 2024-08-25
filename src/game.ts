import { Player } from './player';
import { Turn } from './turn';

export class Game {
  private players: Player[];
  private currentPlayerIndex: number = 0;
  private winningScore: number = 100;

  constructor(numPlayers: number) {
    this.players = Array.from({ length: numPlayers }, () => new Player());
  }

  playTurn(): void {
    const turn = new Turn();
    try {
      while (true) {
        turn.rollDice();
      }
    } catch (e) {
      if (turn.getRoundScore() > 0) {
        this.players[this.currentPlayerIndex].addPoints(turn.getRoundScore());
      }
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  }

  getWinner(): Player | null {
    return this.players.find(player => player.getScore() >= this.winningScore) || null;
  }
}
