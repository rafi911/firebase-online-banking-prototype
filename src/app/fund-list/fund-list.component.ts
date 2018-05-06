import { Component, OnInit,Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EmailComponent } from '../email/email.component';
import { FundTransComponent } from '../fund-trans/fund-trans.component';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css']
})
export class FundListComponent implements OnInit {

 
  Funds = {}
  uid;
  constructor(private db : AngularFireDatabase,private router:Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
        this.Funds = this.db.list(`Customer/${params.id}/Funds`).valueChanges();
    })
   
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(FundTransComponent, {
      width: '50%',
    });
  }

}
