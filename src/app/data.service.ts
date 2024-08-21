import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, retry } from 'rxjs';
import { ModalContent } from 'ui-components-lib';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  setDataSettings(settingsObject:any) {
    return this.http.post<any>('http://localhost:8000/settings', settingsObject).subscribe(
    
    );
  }

  getDataSettings() {
    return this.http.get<any>('http://localhost:8000/settings/00f3');
  }
  notificationData: any;
  isUser:any ='';
  data: any;
  public dataSubject = new BehaviorSubject<any>({});


  constructor(private http: HttpClient, private router: Router) {}


  setData(data: any) {
    return this.http.post<any>('http://localhost:8000/work', data);
  }

  getData() {
  return this.http.get<any>('http://localhost:8000/work')
  }

  getDataById(id:any) {
    return this.http.get<any>('http://localhost:8000/work/'+id)
    }

  async getRealTimeData() {
    let data = await new Promise<any>((resolve, reject) => {
      this.http.get<any>('http://localhost:8000/real-time-data').subscribe(
        (res) => {
          console.log(res);
          res.forEach((element: any) => {
            delete element.id;
            return element
          });  
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const totalDataLength = data.length;
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

  updateRow(id:any){
    this.router.navigate(['/update',id])
  }

  update(data:any){
    return this.http.put('http://localhost:8000/work/'+ data.id, data)

  }

  detailsRow(id:any){
    this.router.navigate(['/details',id])
  }

  login(data:any):Observable<Boolean>{
    if(data.username === 'reda' && data.password === '12345'){
      this.isUser = true
    }else {
      this.isUser = false
    }
    return this.isUser
  }

  setNotification(data:any): void{
    
    this.dataSubject.next(data);

  }
  getNotification(): Observable<any>
  {
    return this.dataSubject.asObservable();
  }
}
