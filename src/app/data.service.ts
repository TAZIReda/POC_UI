import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  setData(data: any) {
    return this.http.post<any>('http://localhost:8000/form', data)
  }

  getData() {
  return this.http.get<any>('http://localhost:8000/form')
  }
}
