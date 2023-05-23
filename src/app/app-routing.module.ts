import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'main/iframepage', component: BoardComponent },
  { path: 'main', component: MainComponent },
  {path : '**', component : WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
