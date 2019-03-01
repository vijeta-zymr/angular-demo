import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://api.github.com/search/users';

  getAllListBySearch(user: string, repos: number, follow: number): Observable<any> {
    console.log('in list service');
    if (repos === 0 && follow === 0) {
      return this.http.get<any>(this.apiUrl + '?q=' + user);
    } else {
      return this.http.get<any>(this.apiUrl + '?q=' + user + '+repos:%3E' + repos + '+followers:%3E' + follow);
    }
  }
}
