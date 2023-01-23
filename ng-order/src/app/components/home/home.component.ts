import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { DatePipe } from '@angular/common';
import { MatCalendar } from '@angular/material/datepicker';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  @Input() selectedDate: any;

  constructor(private fetchService: FetchService, public datepipe : DatePipe){}

  orderList? : Order[];
  todayDate? : any = this.datepipe.transform(Date.now(), 'dd/MM/yyyy');

  ngOnInit(): void {
    /* this.orderList = this.fetchService.getOrderList().sort((a, b) => {
      if(a.time>b.time)
        return 1
      else  
        return -1}) */

    this.fetchService.getOrders().subscribe({
      next: (response) => {
        this.orderList = response.orderList.sort((a: any, b: any) => {
          if(a.time>b.time)
            return 1;
          else
            return -1;
        });
      },
      error: (error) =>{
        console.info('Error fetching orderList')
      },
      complete: () =>{
        console.info('complete')
      }}
    )
  }

  
  

}
