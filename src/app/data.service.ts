import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalContent } from 'ui-components-lib';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) {}

  data: any;
  setData(data: any) {
    return this.http.post<any>('http://localhost:8000/work', data);
  }

  getData() {
    return this.http.get<any>('http://localhost:8000/work');
  }

  async getRealTimeData(pageIndex: number, pageSize: number) {
    //resolve subscription
    let data = await new Promise<any>((resolve, reject) => {
      this.http.get<any>('http://localhost:8000/real-time-data').subscribe(
        (res) => {
          console.log(res);
          res.forEach((element: any) => {
            delete element.id;
            return element
          });  
          console.log(res)
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const totalDataLength = data.length;
    data = data.slice((pageIndex - 1) * pageSize, pageSize * pageIndex);
    return { data, totalDataLength };
  }

  async setRealTimeData(data: any) {
    let newRow = await new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://localhost:8000/real-time-data', data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return newRow;
  }



  deleteRow(data: any) {
    return this.http.delete('http://localhost:8000/work/' + data.id);
  }

  updateRow(data: any) {
    this.data = data;
    return this.http.put('http://localhost:8000/work/' + data.id, data);
  }

  update() {
    return this.data;
  }

  detailsRow(data: any) {
    this.router.navigate(['/details']);
  }
  a: any = '';
  login(data: any): Observable<Boolean> {
    if (data.username === 'reda' && data.password === '12345') {
      this.a = true;
    } else {
      this.a = false;
    }
    return this.a;
  }
}
