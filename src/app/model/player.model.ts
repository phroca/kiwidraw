export class Player {
  address: string;
  surname: string;
  nbOfWin: number;
  nbOfLoss: number;



  constructor(player?: Player){
    if(typeof player === "undefined" || player === null) {
      this.address = '';
      this.surname = '';
      this.nbOfWin = 0;
      this.nbOfLoss = 0;
    } else {
      this.address = player.address;
      this.surname = player.surname;
      this.nbOfWin = player.nbOfWin;
      this.nbOfLoss = player.nbOfLoss;
    }
  }

}
