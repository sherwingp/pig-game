import { Dice } from '../src/dice';

describe('Dice', () => {
  test('should return a number between 1 and 6', () => {
    const dice = new Dice();
    const roll = dice.roll();
    expect(roll).toBeGreaterThanOrEqual(1);
    expect(roll).toBeLessThanOrEqual(6);
  });
});
