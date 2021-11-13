import { Component, OnInit } from '@angular/core';
import { Lottery } from '../model/lottery.model';
import { Player } from '../model/player.model';
import { KiwiService } from '../services/kiwi.service';
import { SharedService } from '../services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-play-lottery',
  templateUrl: './play-lottery.component.html',
  styleUrls: ['./play-lottery.component.scss']
})
export class PlayLotteryComponent implements OnInit {
  currentLottery: Lottery;
  currentPlayer: Player;
  ticketNumber: number;
  tooLateToBuyTicket: boolean;
  constructor(private kiwiService: KiwiService, private sharedService: SharedService) {
    this.currentLottery = new Lottery();
    this.currentPlayer = new Player();
    this.ticketNumber = 0;
    this.tooLateToBuyTicket = false;
  }

  ngOnInit() {
    this.sharedService.currentLottery.subscribe(lottery => {
      if(lottery) {
        this.currentLottery = lottery;
        this.sharedService.currentPlayer.subscribe(currentPlayer => {
          if(currentPlayer) {
            this.currentPlayer = currentPlayer;
            if(this.currentLottery.players.filter(player => player.address === this.currentPlayer.address).length !== 0){
              this.ticketNumber = this.currentLottery.players.findIndex(player => player.address === this.currentPlayer.address) + 1;
            } else {
              if(this.currentLottery.generateWinnerFlag == true){
                this.tooLateToBuyTicket = true;
              } else {
                this.tooLateToBuyTicket = false;
              }
            }
          }
        });
      }
    });
  }

  checkWinner(){
    if(this.currentLottery.winner.address === this.currentPlayer.address){
      Swal.fire({

        title:'YOU WON THE LOTTERY',
        text: 'Congrats you won ! ',
        html: '<iframe src="https://embed.lottiefiles.com/animation/67230"></iframe>',
        background: '#F1FFDD',
        confirmButtonColor: '#A1DB78'
      });
    } else {
      Swal.fire({
        title:"IT'S NOT YOUR TURN...",
        text: 'You are not the winner for this lottery, maybe the next one !',
        html: '<iframe src="https://embed.lottiefiles.com/animation/66934"></iframe>',
        background: '#F1FFDD',
        confirmButtonColor: '#A1DB78'
      });
    }

  }
}
