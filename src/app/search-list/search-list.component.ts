import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../services/config/config.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
  animations: [routerTransition()],
})
export class SearchListComponent implements OnInit {
  public user: string;
  public repos: number;
  public follow: number;
  private rec: any;
  private unsubscribe$ = new Subject();

  constructor(private searchService: SearchService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.user = '';
    this.repos = 0;
    this.follow = 0;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('params', params);
      this.user = params.get('user');
      this.repos = Number(params.get('repos'));
      this.follow = Number(params.get('follow'));
    });

    this.getAllList();
  }

  /**
   * get list of github items.
   */
  private getAllList() {
    if (this.user) {
      console.log('in list component', this.repos, this.follow);
      this.searchService.getAllListBySearch(this.user, this.repos, this.follow)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.rec = result;
        console.log('this.rec', this.rec);
        this.toastr.success('Success', 'Github Items Fetched!!!');
      });
    }
  }

  OnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
