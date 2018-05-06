import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BillListComponent } from '../bill-list/bill-list.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  uid;
  name;
  age;
  date;
  acc_no;
  balance;
  branch;
  country;
  designation;
  gender;
  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase,
    private toastr: ToastrService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.uid = params.id;     
    })
    this.db.list(`Customer/${this.uid}/detail`).valueChanges().subscribe(snap =>{
     // this.customer = snap;
      console.log(snap)
      //console.log(this.customer[0])
      this.name = snap[4];
      this.age = snap[0];
      this.date = snap[1];
      this.designation = snap[2]
      this.gender = snap[3]
      this.acc_no = snap[5]
      this.balance = snap[6]
      this.branch = snap[7]
      this.country = snap[8]
    });

  }
  Logout(){
    console.log("RAfi")
    this.afAuth.auth.signOut();
    this.toastr.success('you are in logout', 'Logout');
    this.router.navigate(['']);
  }

}
