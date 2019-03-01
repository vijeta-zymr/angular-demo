import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.css']
})
export class SearchTextComponent implements OnInit {
  private usertxt: string;
  private repostxt: number;
  private followtxt: number;

  constructor(private router: Router) {
    this.usertxt = '';
    this.repostxt = 0;
    this.followtxt = 0;
  }

  ngOnInit() {}

  search() {
    if(this.repostxt === 0 && this.followtxt === 0) {
      this.router.navigate(['/search-list', this.usertxt]);
    } else {
      this.router.navigate(['/search-list', this.usertxt, this.repostxt, this.followtxt]);
    }
  }
}
