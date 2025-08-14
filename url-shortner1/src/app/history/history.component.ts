import { Component, OnInit } from '@angular/core';
import { ShortenerService, UrlHistoryItem } from '../services/shortener.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  history: UrlHistoryItem[] = [];

  constructor(private shortener: ShortenerService) {}

  ngOnInit() {
    this.shortener.history().subscribe(data => {
      this.history = data;
    });
  }
}
