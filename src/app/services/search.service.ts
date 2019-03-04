import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://api.github.com/search/users';

  getAllListBySearch(user: string, repos: number, follow: number): Observable<any> {
    console.log('in list service');
    let params = new HttpParams();
    params = params.append('q', user);
    if (isNaN(repos) && isNaN(follow)) {
      return this.http.get<any>(this.apiUrl, {params});
    } else {
      params = params.append('repos', repos.toString());
      params = params.append('followers', follow.toString());
      return this.http.get<any>(this.apiUrl, {params});
    }
  }
}
