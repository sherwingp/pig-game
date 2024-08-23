// player.test.ts
import { Player } from '../src/player';

describe('Player class', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player();
  });

  test('initial score is 0', () => {
    expect(player.getScore()).toBe(0);
  });

  test('addPoints increases score correctly', () => {
    player.addPoints(5);
    expect(player.getScore()).toBe(5);
    player.addPoints(10);
    expect(player.getScore()).toBe(15);
  });

  test('resetScore sets score to 0', () => {
    player.addPoints(20);
    player.resetScore();
    expect(player.getScore()).toBe(0);
  });
});