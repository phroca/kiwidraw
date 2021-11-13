import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class IsPlayerAuthorizedGuard implements CanActivate {
  constructor(private router: Router, private sharedService: SharedService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.sharedService.currentLottery.subscribe(lottery => {
        if(!lottery || lottery.id === "") {
          this.router.navigate(['../home']);
          return false;
        } else {
          return true;
        }
      });
      this.sharedService.currentPlayer.subscribe(player => {
        if(!player || player.address === "") {
          this.router.navigate(['../home']);
            return false;

        } else {
          return true;
        }
      });
      return true
  }
}
