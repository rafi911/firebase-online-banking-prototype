import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EmailComponent } from '../email/email.component';
import { BillComponent } from '../bill/bill.component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  constructor(private afAuth:AngularFireAuth, private db : AngularFireDatabase,private router:Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  Bills;
  ngOnInit() {
    // var uid = this.afAuth.auth.currentUser.uid;
    // console.log(this.afAuth.auth.currentUser.uid)
    //   this.Bills = this.db.list(`Customer/${uid}/Bills`).valueChanges();
    this.route.queryParams.subscribe(params =>{
      this.Bills = this.db.list(`Customer/${params.id}/Bills`).valueChanges();
      console.log(this.Bills);
  })
  }
  openPopup(): void {
    let dialog = this.dialog.open(BillComponent, {
      width: '50%',
    });
  }

}
