export class Player {
    private score: number = 0;
  
    addPoints(points: number): void {
      this.score += points;
    }
  
    resetScore(): void {
      this.score = 0;
    }
  
    getScore(): number {
      return this.score;
    }
  }
  