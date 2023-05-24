import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit {
  private el!: HTMLIFrameElement;
  IframeUrl!: SafeResourceUrl;



  constructor(private sanitizer:DomSanitizer ) { }

  ngOnInit(): void {
    this.IframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/online/iframepage');
  }

  onloadIframe(event: Event) {
    this.el = event.target as HTMLIFrameElement;
    this.el.style.height = this.el.contentWindow?.document.body.scrollHeight + 'px';
  }
}
