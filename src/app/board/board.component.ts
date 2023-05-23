import { Component, ViewChild, OnInit } from '@angular/core';
import {
  MoveChange,
  NgxChessBoardComponent,
} from 'ngx-chess-board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

export class BoardComponent implements OnInit {
  @ViewChild('board') boardManager!: NgxChessBoardComponent;

  public fen!: string;
  public pgn!: string;
  public manualMove!: string;

  public player: string = 'None';

  public size = 400;
  public dragDisabled = false;
  public drawDisabled = true;
  public lightDisabled = true;
  public darkDisabled = true;

  ngOnInit(): void {
    window.addEventListener('message', this.onMessageRecived.bind(this));
    window.parent.postMessage(
      {
        action: 'ready',
      },
    );
  }

  onMessageRecived(event: MessageEvent) {
    const { action, payload } = event.data;
    switch (action) {
      case 'movePiece':
        this.handleMove(payload);
        break;
      case 'start':
        this.handleStart(payload);
        break;
      case 'reset':
        this.reset();
        break;
      case 'resume':
        this.handleResume(payload);
        break;
      default:
        console.warn('Unknown action', action);
    }
  }

  public moveCallback(move: MoveChange): void {
    console.warn('moveCallback', move);
    window.parent.postMessage(
      {
        action: 'movePiece',
        payload: move,
      },
    );
  }

  handleMove(payload: string) {
    let move = JSON.parse(payload);
    if (move.color !== this.player) {
      this.manualMove = move.move;
      this.moveManual();
    }
  }

  handleStart(payload: string) {
    console.warn('Start', payload);
    this.reset();
    if (payload === 'black') {
      this.reverse();
      this.switchDarkDisabled();
    } else {
      this.switchLightDisabled();
    }
    this.player = payload;
  }

  handleResume(payload: string){
    console.warn('resume', payload);

  }

  public reset(): void {
    this.boardManager.reset();
    this.fen = this.boardManager.getFEN();
  }

  public reverse(): void {
    this.boardManager.reverse();
  }

  public undo(): void {
    this.boardManager.undo();
    this.fen = this.boardManager.getFEN();
    this.pgn = this.boardManager.getPGN();
  }

  public setFen(): void {
    if (this.fen) {
      this.boardManager.setFEN(this.fen);
    }
  }

  getFEN() {
    let fen = this.boardManager.getFEN();
    alert(fen);
  }

  showMoveHistory() {
    alert(JSON.stringify(this.boardManager.getMoveHistory()));
  }

  switchDrag() {
    this.dragDisabled = !this.dragDisabled;
  }

  switchDraw() {
    this.drawDisabled = !this.drawDisabled;
  }

  switchDarkDisabled() {
    this.darkDisabled = !this.darkDisabled;
  }

  switchLightDisabled() {
    this.lightDisabled = !this.lightDisabled;
  }

  public setPgn() {
    this.boardManager.setPGN(this.pgn);
  }

  getPGN() {
    alert(this.boardManager.getPGN());
  }

  public moveManual(): void {
    this.boardManager.move(this.manualMove);
  }

}
