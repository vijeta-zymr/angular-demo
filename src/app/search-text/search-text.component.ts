import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.css']
})
export class SearchTextComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      user: ['', Validators.required],
      repos: ['', [Validators.maxLength(6)]],
      follow: ['', [Validators.maxLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  search() {
    console.log('repos form control', this.searchForm.value.repos);
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      if (!this.searchForm.value.repos && !this.searchForm.value.follow) {
        console.log('if');
        this.router.navigate(['/search-list'], { queryParams: { user: this.searchForm.value.user } });
      } else {
        console.log('else');
        this.router.navigate(['/search-list'], { queryParams: { user: this.searchForm.value.user,
           repos: this.searchForm.value.repos, follow: this.searchForm.value.follow } });
      }
    }
  }
}
