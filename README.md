# Pig Game

CLI-based pig dice game implemented in TypeScript.
## Get started

To run this project locally, you need to have [Node.js](https://nodejs.org/) installed. Follow the steps below to get started:

1. **Install:**

   ```bash
   git clone https://github.com/sherwingp/pig-dice-game.git
   cd pig-dice-game
   npm i
   npm run build
   
2. **Play:**

   ```bash
   node dist/cli-game.js

  ## Rules

  The game requires two or more players.

It requires two 6 sided dice.

Each player in turn roles the dice counting up the numeric scores until either:

a. The Player decides to stop rolling - in which case the user notes down the total they have accumulated from that turn and adds that to their overall score.

b. The Player rolls a 1. – They lose any points they accumulated for that round.

c. The Player rolls two 1’s (snake eyes) and then they lose their points from that round and any points they’ve accumulated from previous rounds. E.g. their score goes back to 0.

When any of the point 2 scenarios have happened play passes to the next player and the cycle repeats.

A winner is the first person to reach 100 points.
