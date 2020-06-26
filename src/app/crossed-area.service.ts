import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossedAreaService {
  baseUrl = "";
  constructor(private http: HttpClient) { }
  getData(apiPath: string): Observable<any> {
    return this.http.get<any>(apiPath);
  }
}
