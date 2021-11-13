import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IsPlayerAuthorizedGuard } from './play-lottery/is-player-authorized.guard';
import { PlayLotteryComponent } from './play-lottery/play-lottery.component';
import { WinnerListComponent } from './winner-list/winner-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play-lottery', component: PlayLotteryComponent, canActivate: [IsPlayerAuthorizedGuard] },
  { path: 'winner-list', component: WinnerListComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
