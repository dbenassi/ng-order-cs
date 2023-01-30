import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FetchService {
  
  constructor(public httpClient: HttpClient, public datepipe: DatePipe){}

  todayDate? : any = this.datepipe.transform(Date.now(), 'dd-MM-yyyy');

  getOrders(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/orders/list')
  }

  getTodayOrders(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/orders/' + this.todayDate)
  }

  getOrderRows(id: number): Observable<any>{
    return this.httpClient.get('http://localhost:3000/row/' + id)
  }
  
  getArticles(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/article/')
  }
}
