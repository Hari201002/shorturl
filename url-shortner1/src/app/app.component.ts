// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'url-shortener';
// }
import { Component, OnInit } from '@angular/core';
import { ShortenerService } from './services/shortener.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  url = '';
  shortUrl = '';
  historyList: any[] = [];

  constructor(private shortener: ShortenerService) {}

  ngOnInit() {
    this.loadHistory();
  }

  shortenUrl() {
    if (!this.url) return;
    this.shortener.shorten(this.url).subscribe(res => {
      this.shortUrl = res.short_url;
      this.url = '';
      this.loadHistory();
    });
  }

  loadHistory() {
    this.shortener.history().subscribe(data => {
      this.historyList = data;
    });
  }
}
