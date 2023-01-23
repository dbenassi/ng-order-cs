import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type ArticleRow = {
  item: string;
  amount: number;
};

type Order = {
  
  id: number;
  name: string;
  items: ArticleRow[];
  date: string;
  time: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class FetchService {
  
  constructor(public httpClient: HttpClient){}

  getOrders(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/orders/list')
  }

  articles: string[] = [
    'Penne all\'arrabbiata',
    'Risotto alla marinara',
    'Fritto di pesce',
    'Scaloppine al limone',
    'Spinaci',
    'Patate fritte',
    'Panna cota'
  ]

  orderList: Order[] = [
    {
      id: 0,
      name: 'Mario Rossi',
      items:[
        {item: this.articles[0], amount: 3},
        {item: this.articles[2], amount: 1},
        {item: this.articles[4], amount: 2},
        {item: this.articles[6], amount: 1},
      ],
      date: '06/01/2023',
      time: '11:30',
      completed: false
    },

    {
      id: 1,
      name: 'Luca Ciccarese',
      items:[
        {item: this.articles[0], amount: 6},
        {item: this.articles[1], amount: 1},
        {item: this.articles[3], amount: 3},
        {item: this.articles[5], amount: 1},
      ],
      date: '09/01/2023',
      time: '12:30',
      completed: false
    },

    {      
      id: 2,
      name: 'Serena De Carlini',
      items:[
        {item: this.articles[1], amount: 7},
        {item: this.articles[2], amount: 1},
        {item: this.articles[3], amount: 1}
      ],
      date: '06/01/2023',
      time: '14:30',
      completed: false
    },

    {
      id: 3,
      name: 'Gisella Ranieri',
      items:[
        {item: this.articles[0], amount: 1},
        {item: this.articles[2], amount: 1},
        {item: this.articles[4], amount: 1},
        {item: this.articles[3], amount: 5},
        {item: this.articles[1], amount: 1},
        {item: this.articles[5], amount: 3},
        {item: this.articles[6], amount: 1},
      ],
      date: '02/01/2023',
      time: '12:30',
      completed: false
    }
  ];

  getOrderList(): Order[]{
    return this.orderList; 
  }




}
