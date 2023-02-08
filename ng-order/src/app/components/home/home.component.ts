import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

  name?: string;
  day?: string;
  time?: string;

  @Input() selectedDate: any;

  todayDate? : any = this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
  
  constructor(public datepipe : DatePipe, public dialog : MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewDialogComponent, {
      data: {name: this.name, day: this.name, time: this.time}
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Dialog closed");
      this.name = result;
    })
  }

}
