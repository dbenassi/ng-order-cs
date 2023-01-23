import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { FetchService } from 'src/app/services/fetch.service';

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
  @Input() order?: any;
  @Input() today?: number;

  itemOptions?: number;
  selectedItems?: number;

  //ProgressBar parameters
  mode: ProgressBarMode = 'determinate'
  value: number = 0;
  

  constructor(public dialog: MatDialog, public dialog2: MatDialog){}

  ngOnInit(){
    //this.selectedItems= this.items.selectedOptions.select.length;
  }

  onSelectedChange(){
    this.selectedItems = this.items.selectedOptions.select.length;
  }

  openDeleteDialog(){
    this.dialog.open(DialogDelete);
  }

  openCompleteDialog(){
    this.dialog2.open(DialogCompleted);
  }

  setCompleted(){
    this.order.completed = true;
  }
    
}
