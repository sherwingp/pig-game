import { Game } from '../src/game';
import { Player } from '../src/player';
import { Turn } from '../src/turn';

jest.mock('../src/turn');

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(2);
    jest.clearAllMocks();
  });

  test('should initialize correctly with two players', () => {
    expect(game.currentPlayerIndex).toBe(0);
    expect(game['players'].length).toBe(2);
  });

  test('should roll dice and accumulate score when not rolling a 1', () => {
    const mockRollDice = jest.spyOn(Turn.prototype, 'rollDice').mockImplementation(() => [3, 5]);
    const mockGetRoundScore = jest.spyOn(Turn.prototype, 'getRoundScore').mockImplementation(() => 8);

    const continueTurn = game.rollDice();

    expect(mockRollDice).toHaveBeenCalled();
    expect(mockGetRoundScore).toHaveBeenCalled();
    expect(continueTurn).toBe(true);
    expect(game['currentTurn'].getRoundScore()).toBe(8);
  });

  test('should end turn and reset score on rolling a single 1', () => {
    const mockRollDice = jest.spyOn(Turn.prototype, 'rollDice').mockImplementation(() => [1, 3]);
    const mockGetRoundScore = jest.spyOn(Turn.prototype, 'getRoundScore').mockImplementation(() => 0);

    const continueTurn = game.rollDice();

    expect(mockRollDice).toHaveBeenCalled();
    expect(continueTurn).toBe(false);
    expect(game.currentPlayerIndex).toBe(1);
    expect(game['currentTurn'].getRoundScore()).toBe(0);
    expect(game['players'][0].getScore()).toBe(0);
  });

  test('should end turn and reset total score on snake eyes (double 1s)', () => {
    const mockRollDice = jest.spyOn(Turn.prototype, 'rollDice').mockImplementation(() => [1, 1]);
    const mockGetRoundScore = jest.spyOn(Turn.prototype, 'getRoundScore').mockImplementation(() => 0);

    const continueTurn = game.rollDice();

    expect(mockRollDice).toHaveBeenCalled();
    expect(continueTurn).toBe(false);
    expect(game.currentPlayerIndex).toBe(1);
    expect(game['players'][0].getScore()).toBe(0);
  });

  test('should hold the turn and accumulate score correctly', () => {
    const mockRollDice = jest.spyOn(Turn.prototype, 'rollDice').mockImplementation(() => [4, 5]);
    const mockGetRoundScore = jest.spyOn(Turn.prototype, 'getRoundScore').mockImplementation(() => 9);

    game.rollDice();
    game.hold();

    expect(game.currentPlayerIndex).toBe(1);
    expect(game['players'][0].getScore()).toBe(9);
  });

  test('should identify winner correctly', () => {
    game['players'][0].addPoints(100);
    const winner = game.getWinner();
    expect(winner).toBe(game['players'][0]);
  });

  test('should return null when no player has reached the winning score', () => {
    const winner = game.getWinner();
    expect(winner).toBeNull();
  });
});