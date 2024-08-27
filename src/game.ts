import { Player } from './player';
import { Turn } from './turn';

export class Game {
  private players: Player[];
  public currentPlayerIndex: number;
  private winningScore: number;
  private currentTurn: Turn;

  constructor(numPlayers: number) {
    this.players = Array.from({ length: numPlayers }, () => new Player());
    this.currentPlayerIndex = 0;
    this.winningScore = 100;
    this.currentTurn = new Turn();
  }

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

// Returns true if player can roll again, false if the turn ends
  public rollDice(): boolean {
    try {
      const rolls = this.currentTurn.rollDice();
      console.log(`Rolled: ${rolls.join(', ')}`);

      if (rolls.includes(1)) {
        if (rolls[0] === 1 && rolls[1] === 1) {
          console.log('Snake eyes! All points are lost.');
          this.getCurrentPlayer().resetScore();
        } else {
          console.log('Rolled a 1! Round points are lost.');
        }
        this.endTurn();
        return false;
      } else {
        console.log(`Round score: ${this.currentTurn.getRoundScore()}`);
        return true;
      }
    } catch (error: any) {
      console.log('Error during turn:', error.message);
      this.endTurn();
      return false;
    }
  }

  public hold(): void {
    const roundScore = this.currentTurn.getRoundScore();
    this.getCurrentPlayer().addPoints(roundScore);
    console.log(`Player ${this.currentPlayerIndex + 1} ends turn with a total score of ${this.getCurrentPlayer().getScore()}`);
    this.endTurn();
  }

  private endTurn(): void {
    this.currentTurn = new Turn();
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  public getWinner(): Player | null {
    return this.players.find(player => player.getScore() >= this.winningScore) || null;
  }
}
