import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from './model/player.model';
import { ContractService } from './services/contract.service';
import { KiwiService } from './services/kiwi.service';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'kiwidraw';
  account: any = "";
  normalizedAccount = "";
  currentPlayer: Player;
  constructor(private contractService: ContractService, private kiwiService: KiwiService, private sharedService: SharedService){
    this.currentPlayer = new Player();
  }
  ngOnInit() {

  }

  connectToWallet(){
    this.contractService.enableMetaMaskAccount();
    this.contractService.getAccount().then(account =>{
      if(account){
        this.account = account;
        this.kiwiService.findPlayerByAddress(this.account).subscribe(player => {
          if(player) {
            this.currentPlayer = player;
          } else {
            this.currentPlayer = {
              address: this.account,
              surname: "",
              nbOfWin: 0,
              nbOfLoss: 0}
          }
          this.sharedService.changeCurrentPlayer(this.currentPlayer);
        });
      }
    });
  }

  getNormalizedAccount(value: any): string {
    var splitIndex = Math.round( value.length * 0.75 );

    let leftText = value.slice( 0, splitIndex );;
    let rightText = value.slice( splitIndex );
    return leftText + "..." + rightText;
  }
}
