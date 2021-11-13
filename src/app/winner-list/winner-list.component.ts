import { Component, OnInit } from '@angular/core';
import { Lottery } from '../model/lottery.model';
import { KiwiService } from '../services/kiwi.service';

@Component({
  selector: 'app-winner-list',
  templateUrl: './winner-list.component.html',
  styleUrls: ['./winner-list.component.scss']
})
export class WinnerListComponent implements OnInit {
  displayedColumns = ['address', 'numberTicket', 'collected'];
  lotteries: Lottery[]
  constructor(private kiwiService: KiwiService) {
    this.lotteries = [];
}

  ngOnInit(): void {

    this.kiwiService.getLotteries().subscribe( lotteries => {
      if(lotteries){
        this.lotteries = lotteries.filter(lottery => lottery.generateWinnerFlag);
      }
    }
    )
  }

}
