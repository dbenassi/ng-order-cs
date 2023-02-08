import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

type OrderSQL = {
  ID: number;
  NOME: string;
  DAY: string;
  TIME: string;
  TOTALE: string;
  COMPLETATO: number;
}

@Component({
  selector: 'app-orderboard',
  templateUrl: './orderboard.component.html',
  styleUrls: ['./orderboard.component.scss']
})

export class OrderboardComponent implements OnInit {

  constructor(private fetchService: FetchService, public datepipe: DatePipe){}

  orderList? : Array<OrderSQL>;
  todayDate? : any = this.datepipe.transform(Date.now(), 'dd-MM-yyyy');

  ngOnInit(): void {

    this.fetchService.getTodayOrders().subscribe({
      next: (response) => {

        this.orderList = response.sort((a: OrderSQL, b: OrderSQL) => {
          if(a.TIME>b.TIME)
            return 1
          else
            return -1
        });

        console.log(this.orderList)
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
