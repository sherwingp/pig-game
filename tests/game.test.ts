import { Game } from '../src/game';
import { Player } from '../src/player';

describe('Game', () => {
  test('should declare a winner when a player reaches 100 points', () => {
    const game = new Game(2);
    const player1 = game['players'][0];
    player1['score'] = 100;

    expect(game.getWinner()).toBe(player1);
  });

  test('should switch turns between players', () => {
    const game = new Game(2);
    game.playTurn();
    expect(game['currentPlayerIndex']).toBe(1);
    game.playTurn();
    expect(game['currentPlayerIndex']).toBe(0);
  });
});
