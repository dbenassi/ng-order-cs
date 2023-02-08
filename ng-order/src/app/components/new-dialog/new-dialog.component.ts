import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  day: string;
  time: string;
  completed: boolean;
}

@Component({
  selector: 'new-order-dialog',
  templateUrl: 'new-dialog.component.html',
})

export class NewDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}