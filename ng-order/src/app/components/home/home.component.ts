import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

  @Input() selectedDate: any;

  todayDate? : any = this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
  
  constructor(public datepipe : DatePipe){}

}
