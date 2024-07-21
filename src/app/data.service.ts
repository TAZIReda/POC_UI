import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalContent } from 'ui-components-lib';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient, private router: Router) { }

  setData(data: any) {
    return this.http.post<any>('http://localhost:8000/work', data)
  }

  getData() {
  return this.http.get<any>('http://localhost:8000/work')
  }
  getDataById(id:any) {
    return this.http.get<any>('http://localhost:8000/work/'+id)
    }

  deleteRow(data:any){
    return this.http.delete('http://localhost:8000/work/'+ data.id)
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
 isUser:any ='';

  login(data:any):Observable<Boolean>{
    if(data.username === 'reda' && data.password === '12345'){
      this.isUser = true
    }else {
      this.isUser = false
    }
    return this.isUser
  }
}
