import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MainComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChessBoardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
