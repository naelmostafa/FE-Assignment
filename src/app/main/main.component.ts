import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private el!: HTMLIFrameElement;
  private turn: 'white' | 'black' = 'white';
  IframeUrl!: SafeResourceUrl;

  constructor(private sanatizer: DomSanitizer) {
  }

  ngOnInit() {
    this.IframeUrl = this.sanatizer.bypassSecurityTrustResourceUrl('/main/iframepage');
    window.addEventListener('message', this.handleMessage.bind(this));
    this.startGame();
  }


  handleMessage(event: MessageEvent) {
    const { action, payload } = event.data;
    switch (action) {
      case 'movePiece':
        this.movePiece(payload);
        break;
      case 'ready':
        this.createNewGame();
    }
  }

  movePiece(payload: any) {
    this.turn = this.turn === 'white' ? 'black' : 'white';
    console.log(this.turn)
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

  }

  sendToIframe() {

  }

  createNewGame() {
    this.turn = 'white';
    this.el.contentWindow?.postMessage(
      {
        action: 'reset',
        payload: null,
      },
      '*'
    );
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

}

