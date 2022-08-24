import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  icons: string[] = ['bi-gear', 'bi-journal-text', 'bi-clock', 'bi-calendar-date', 'bi-calculator'];
  routerLinks: string[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let icon of this.icons) {
      this.routerLinks.push(icon);
    }
  }

  ngAfterViewInit(): void {
  }

}
