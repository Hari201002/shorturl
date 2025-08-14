// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface ShortenResponse {
//   short_url: string;
//   code: string;
// }

// @Injectable({ providedIn: 'root' })
// export class ShortenerService {
//   private base = 'http://127.0.0.1:8000'; // Django backend

//   constructor(private http: HttpClient) {}

//   shorten(url: string): Observable<ShortenResponse> {
//     return this.http.post<ShortenResponse>(`${this.base}/api/shorten/`, { url });
//   }

//   stats(code: string) {
//     return this.http.get(`${this.base}/api/stats/${code}/`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ShortenResponse {
  short_url: string;
  code: string;
}

export interface UrlHistoryItem {
  short_url: string;
  original_url: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ShortenerService {
  private base = 'http://127.0.0.1:8000'; // Django backend

  constructor(private http: HttpClient) {}

  shorten(url: string): Observable<ShortenResponse> {
    return this.http.post<ShortenResponse>(`${this.base}/api/shorten/`, { url });
  }

  stats(code: string) {
    return this.http.get(`${this.base}/api/stats/${code}/`);
  }

  history() {
  return this.http.get<any[]>(`${this.base}/api/history/`);
}

}
