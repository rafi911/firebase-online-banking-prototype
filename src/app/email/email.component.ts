import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FundTransComponent } from '../fund-trans/fund-trans.component';
import {BillComponent} from '../bill/bill.component'
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  name;
  animal
  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BillComponent, {
      width: '50%',
      data: { name: this.name, animal: this.animal }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }


}
