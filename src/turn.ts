import { Dice } from './dice';

export class Turn {
  private dice: Dice;
  private roundScore: number = 0;

  constructor() {
    this.dice = new Dice();
  }

  rollDice(): number[] {
    const roll1 = this.dice.roll();
    const roll2 = this.dice.roll();

    if (roll1 === 1 && roll2 === 1) {
      this.roundScore = 0;
      throw new Error('Snake eyes! Lose all points.');
    } else if (roll1 === 1 || roll2 === 1) {
      this.roundScore = 0;
      throw new Error('Rolled a 1! Lose round points.');
    } else {
      this.roundScore += roll1 + roll2;
    }

    return [roll1, roll2];
  }

  getRoundScore(): number {
    return this.roundScore;
  }
}
