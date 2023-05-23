import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private readonly storageKey = 'chess-game';
  private lastMove!: string;

  private el!: HTMLIFrameElement;
  private turn: 'white' | 'black' = 'white';
  IframeUrl!: SafeResourceUrl;

  constructor(private sanatizer: DomSanitizer, private localStorage: LocalService) {
  }

  ngOnInit() {
    // check for state
    const state = this.localStorage.getDate(this.storageKey);
    if (state) {
      this.handleOldState(state);
    }
    this.IframeUrl = this.sanatizer.bypassSecurityTrustResourceUrl('/main/iframepage');
    window.addEventListener('message', this.handleMessage.bind(this));
  }


  handleMessage(event: MessageEvent) {
    const { action, payload } = event.data;
    switch (action) {
      case 'movePiece':
        this.movePiece(payload);
        break;
      case 'ready':
        this.startGame();
    }
  }

  movePiece(payload: any) {
    this.turn = this.turn === 'white' ? 'black' : 'white';
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.id !== payload.color) {
        iframe.contentWindow?.postMessage(
          {
            action: 'movePiece',
            payload: JSON.stringify(payload),
          },
          '*'
        );
      }
    });

    this.localStorage.saveDate(this.storageKey, { lastMove: JSON.stringify(payload) });

    if (payload.check) {
      alert(`Check ${payload.color} win`);
      this.startGame();
      return;
    }

  }

  startGame() {
    // select all iframes
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.contentWindow?.postMessage(
        {
          action: 'start',
          payload: iframe.id,
        },
        '*'
      );
    });
  }

  onloadIframe(event: Event) {
    this.el = event.target as HTMLIFrameElement;
    this.el.style.height = this.el.contentWindow?.document.body.scrollHeight + 'px';
  }

  handleOldState(state: any) {
    this.lastMove = state.lastMove;
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.contentWindow?.postMessage(
        {
          action: 'resume',
          payload: this.lastMove,
        },
        '*'
      );
    });
  }

  resumeGame() {
    this.handleOldState(this.localStorage.getDate(this.storageKey));
  }
}
