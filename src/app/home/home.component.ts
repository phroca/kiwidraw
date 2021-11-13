import { AfterViewChecked, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Lottery } from '../model/lottery.model';
import { Player } from '../model/player.model';
import { KiwiService } from '../services/kiwi.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  public dateNow = new Date();
  public dDay = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;
  timeDifference!: number;
  secondsToDday!: number;
  minutesToDday!: number;
  hoursToDday!: number;
  daysToDday!: number;

  title: string;
  currentLottery: Lottery;
  currentPlayer: Player;
  isAuthorizedToBuyTicket: boolean;
  constructor(private kiwiService: KiwiService, private sharedService: SharedService) {
    this.title = "Get a chance<br>to win on <br><span class='title__color'>Kiwidraw</span> <br>with cryptos";
    this.currentLottery = new Lottery();
    this.currentPlayer = new Player();
    this.isAuthorizedToBuyTicket = false;
  }


  ngOnInit(): void {

    this.kiwiService.getLotteries().subscribe(lotteries => {
      if(lotteries) {
        for (let lottery of lotteries) {
          if (lottery.isActive === true){
            this.currentLottery = lottery;
            this.dDay = new Date(this.currentLottery.endDate);
            break;
          }
        }
        this.sharedService.changeCurrentLottery(this.currentLottery);
      }
      let intv = setInterval(() => {
        this.getTimeDifference();
        if(this.timeDifference < 0){
          if(this.currentLottery.generateWinnerFlag!== true){
            this.generateWinner();
          }
          clearInterval(intv);
        }
      }, 1000)
    });

  }

  ngAfterViewChecked(): void {
    this.sharedService.currentPlayer.subscribe(currentPlayer => {
      if(currentPlayer) {
        this.currentPlayer = currentPlayer;
      }
    });
  }

  generateWinner() {
    if(this.currentLottery.players.length !== 0){
      this.kiwiService.generateWinner(this.currentLottery).subscribe(newLotteryWithWinner=> {
        if(newLotteryWithWinner){
          this.currentLottery = newLotteryWithWinner;
          this.sharedService.changeCurrentLottery(this.currentLottery);
        }
      })
    } else{
      //TODO
      // DEFINIR QUAND IL N'Y A PAS DE GAGNANT
    }
  }

  buyTicket(){
    if(this.currentLottery.players.length === 0){
      this.isAuthorizedToBuyTicket = true;
    } else {
      for(let playerInLottery of this.currentLottery.players) {
        //si le joueur n'as pas été inscrit ni joué
        //dans cette lotterie il peut acheter un ticket
        if(this.currentPlayer.address !== "" && this.currentPlayer.address !== playerInLottery.address){
          this.isAuthorizedToBuyTicket = true;
          break;
        } else {
          this.isAuthorizedToBuyTicket = false;
        }
      }
    }
    if(this.isAuthorizedToBuyTicket === true) {
      // Intègre le joueur dans la lotterie
      // ON rajoute un ticket d'acheté au joueur
      this.currentLottery.players.push(this.currentPlayer);
      this.currentLottery.ticketsSold++;
      this.kiwiService.updateLottery(this.currentLottery).subscribe(lotteryUpdated => {
        if(lotteryUpdated !== null) {
          console.log(lotteryUpdated);
          this.currentLottery = lotteryUpdated;
          Swal.fire({
            icon: 'success',
            title:'Kiwidraw',
            text: 'Your ticket is purchased !',
            background: '#F1FFDD',
            confirmButtonColor: '#A1DB78'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title:'Kiwidraw',
            text: 'An error was occured during the ticket purchasing !',
            background: '#F1FFDD',
            confirmButtonColor: '#A1DB78'
          });
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title:'Kiwidraw',
        text: 'You have already a ticket for the Lottery !',
        background: '#F1FFDD',
        confirmButtonColor: '#A1DB78'
      })
    }

  }
  private getTimeDifference () {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference: number) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }
}
