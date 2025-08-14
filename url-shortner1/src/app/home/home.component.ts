// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ShortenerService } from '../services/shortener.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {
//   loading = false;
//   shortUrl: string | null = null;
//   error: string | null = null;

//   form = this.fb.group({
//     url: ['', [Validators.required]]
//   });

//   constructor(private fb: FormBuilder, private api: ShortenerService) {}

//   submit() {
//     this.error = null;
//     this.shortUrl = null;

//     if (this.form.invalid) {
//       this.error = 'Please enter a URL.';
//       return;
//     }

//     this.loading = true;
//     this.api.shorten(this.form.value.url as string).subscribe({
//       next: res => {
//         this.shortUrl = res.short_url;
//         this.loading = false;
//       },
//       error: err => {
//         this.error = err?.error || 'Failed to shorten URL';
//         this.loading = false;
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShortenerService } from '../services/shortener.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  shortUrl: string | null = null;
  error: string | null = null;
  historyList: any[] = [];

  form = this.fb.group({
    url: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private api: ShortenerService) {}

  ngOnInit() {
    this.loadHistory();
  }

  submit() {
    this.error = null;
    this.shortUrl = null;

    if (this.form.invalid) {
      this.error = 'Please enter a URL.';
      return;
    }

    this.loading = true;
    this.api.shorten(this.form.value.url as string).subscribe({
      next: res => {
        this.shortUrl = res.short_url;
        this.loading = false;
        this.loadHistory(); // refresh history after new link
      },
      error: err => {
        this.error = err?.error || 'Failed to shorten URL';
        this.loading = false;
      }
    });
  }

  loadHistory() {
    this.api.history().subscribe({
      next: data => {
        this.historyList = data;
      },
      error: () => {
        this.historyList = [];
      }
    });
  }
}
