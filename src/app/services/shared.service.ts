import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lottery } from '../model/lottery.model';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentPlayerSource = new BehaviorSubject<Player>(new Player());
  private currentLotterySource = new BehaviorSubject<Lottery>(new Lottery());

  currentPlayer = this.currentPlayerSource.asObservable();
  currentLottery = this.currentLotterySource.asObservable();


  changeCurrentPlayer(player: Player) {
    this.currentPlayerSource.next(player);
  }

  changeCurrentLottery(lottery: Lottery) {
    this.currentLotterySource.next(lottery);
  }

  constructor() { }
}
