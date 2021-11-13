import { Player } from "./player.model";

export class Lottery {
  id: string;
  players: Player[];
  maxTicketsToSell: number;
  ticketsSold: number;
  startDate: string;
  endDate: string;
  generateWinnerFlag: boolean;
  winner: Player;
  isWinnerCollected: boolean;
  isActive: boolean;

  constructor(lottery?: Lottery){
    if(typeof lottery === "undefined" || lottery === null) {
      this.id = '';
      this.players = [];
      this.maxTicketsToSell = 0;
      this.ticketsSold = 0;
      this.startDate = '';
      this.endDate = '';
      this.generateWinnerFlag = false;
      this.winner = new Player();
      this.isWinnerCollected = false;
      this.isActive = false;
    } else {
      this.id = lottery.id;
      this.players = lottery.players;
      this.maxTicketsToSell = lottery.maxTicketsToSell;
      this.ticketsSold = lottery.ticketsSold;
      this.startDate = lottery.startDate;
      this.endDate = lottery.endDate;
      this.generateWinnerFlag = lottery.generateWinnerFlag
      this.winner = lottery.winner;
      this.isWinnerCollected = lottery.isWinnerCollected;
      this.isActive = lottery.isActive;
    }
  }

}
