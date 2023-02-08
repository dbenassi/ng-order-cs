import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatProgressBar, ProgressBarMode } from '@angular/material/progress-bar';
import { FetchService } from 'src/app/services/fetch.service';

type OrderSQL = {
  ID: number;
  NOME: string;
  DAY: string;
  TIME: string;
  TOTALE: string;
  COMPLETATO: number;
}

type ArticleRowSQL = {
  DESCRIZIONE: string;
  QUANTITA: number;
  OPTIONS: string;
}

//DELETE DIALOG
@Component({
  selector: 'dialog-delete',
  templateUrl: './dialog-delete.html',
})
export class DialogDelete {}

//COMPLETE DIALOG
@Component({
  selector: 'dialog-completed',
  templateUrl: './dialog-delete.html',
})
export class DialogCompleted {}

//ORDER COMPONENT
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  @ViewChild('items') items!: MatSelectionList;
  @Input() order!: OrderSQL;
  @Input() today?: number;

  orderItems?: Array<ArticleRowSQL>;
  itemCount: number = 1;
  selectedItems?: number;
  isCompleteDisabled: boolean = true;

  //ProgressBar parameters
  mode: ProgressBarMode = 'determinate'
  value: number = 0;

  constructor(public dialog: MatDialog, public dialog2: MatDialog, private fetchService: FetchService){}

  ngOnInit(){
    //this.selectedItems= this.items.selectedOptions.select.length;
    this.fetchService.getOrderRows(this.order.ID).subscribe({
      next: (response) => {
        this.orderItems = response;
        this.itemCount = this.orderItems!.length;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('complete')
      }
    })

  }

  onSelectedChange(){
    this.selectedItems = this.items.selectedOptions.selected.length;
    this.value = (this.selectedItems*100)/this.itemCount!;
    this.selectedItems === this.itemCount ? this.isCompleteDisabled = false : this.isCompleteDisabled = true;
  }

  openDeleteDialog(){
    this.dialog.open(DialogDelete);
  }

  openCompleteDialog(){
    this.dialog2.open(DialogCompleted);
  }

  /* setCompleted(){
    this.order.completed = true;
  } */
  
    
}
