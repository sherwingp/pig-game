import { Turn } from '../src/turn';
import { Dice } from '../src/dice';

describe('Turn', () => {
  let turn: Turn;
  let mockDice: Dice;

  beforeEach(() => {
    mockDice = {
      roll: jest.fn(),
    } as unknown as Dice;

    turn = new Turn();
    (turn as any).dice = mockDice;
  });

  test('should accumulate points when no 1 is rolled', () => {
    (mockDice.roll as jest.Mock)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(5);
    turn.rollDice();
    expect(turn.getRoundScore()).toBe(9);
  });

  test('should reset round score when a single 1 is rolled', () => {
    (mockDice.roll as jest.Mock)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(5);

    expect(() => turn.rollDice()).toThrow('Rolled a 1! Lose round points.');
    expect(turn.getRoundScore()).toBe(0);
  });

  test('should reset round score when snake eyes (two 1s) are rolled', () => {
    (mockDice.roll as jest.Mock)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1);

    expect(() => turn.rollDice()).toThrow('Snake eyes! Lose all points.');
    expect(turn.getRoundScore()).toBe(0);
  });

  test('should correctly accumulate score across multiple rolls when no 1 is rolled', () => {
    (mockDice.roll as jest.Mock)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(6);

    turn.rollDice();
    turn.rollDice();
    expect(turn.getRoundScore()).toBe(18);
  });

  test('should reset score if a 1 is rolled after accumulating points', () => {
    (mockDice.roll as jest.Mock)
      .mockReturnValueOnce(6)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(1);

    turn.rollDice();
    expect(turn.getRoundScore()).toBe(10);

    expect(() => turn.rollDice()).toThrow('Rolled a 1! Lose round points.');
    expect(turn.getRoundScore()).toBe(0);
  });
});
