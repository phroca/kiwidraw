import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Lottery } from '../model/lottery.model';
import { environment } from 'src/environments/environment';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class KiwiService {

  constructor(private http: HttpClient) { }

  getLotteries(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(environment.lotteries).pipe(
      catchError(this.handleError)
    );

  }

  getLotteryById(id: string): Observable<Lottery> {
    return this.http.get<Lottery>(environment.lotteries + "/" + id).pipe(
      catchError(this.handleError)
    );
  }

  updateLottery(_lottery : Lottery): Observable<Lottery> {
    return this.http.post<Lottery>(environment.lotteries + "/update", _lottery).pipe(
      catchError(this.handleError)
    );
  }

  findPlayerByAddress(_address: string): Observable<Player> {
    return this.http.get<Player>(environment.players + "/" + _address).pipe(
      catchError(this.handleError)
    );
  }

  generateWinner(_lottery: Lottery): Observable<Lottery>{
    return this.http.post<Lottery>(environment.lotteries + "/generateNbForWinner", _lottery).pipe(
      catchError(this.handleError)
    );
  }

  setWinnerOfLottery(_winner: Player, _idLottery: string): Observable<boolean> {
    return this.http.post<boolean>(environment.lotteries,{ winner: _winner, idLotteryy: _idLottery}).pipe(
      catchError(this.handleError)
    );
  }

  getAdressOfWinner(_idLottery: string): Observable<string>{
    return this.http.get<string>(environment.players + "/" + _idLottery).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
