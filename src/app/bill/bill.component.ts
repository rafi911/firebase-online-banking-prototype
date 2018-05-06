import { Component, OnInit,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BillListComponent } from '../bill-list/bill-list.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bill = new Bill();
  selected;
  balance;
  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase,
    private toastr: ToastrService,private route: Router,public dialog: MatDialogRef<BillListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    

  ngOnInit() {
  }
  onSubmit(Bill: NgForm){
    if(Bill.value.amount!= null || Bill.value.Type!= null || Bill.value.Ref!= null){
      this.insertBill(Bill.value,this.afAuth.auth.currentUser.uid);
    }else{
      this.toastr.error('Your bill transaction has failed',"Error")
    }
    

  }
  insertBill(bill:Bill,uid){
    this.db.list(`Customer/${this.afAuth.auth.currentUser.uid}/detail`).valueChanges().subscribe(snap =>{
     // this.customer = snap;
      console.log(snap)
      //console.log(this.customer[0])
      this.balance = snap[6]

      console.log("balance" + this.balance);
      console.log("Bill Amount" + bill.amount);
      if(bill.amount <= this.balance){
        this.db.list(`Customer/${uid}/Bills`).push({
          amount : bill.amount,
          Ref : bill.Ref,
          Type : bill.Type
        })
        var UpdatedBalance = this.balance - bill.amount;
        this.db.list(`Customer/${this.afAuth.auth.currentUser.uid}`).update('detail',{
          balance : UpdatedBalance
        })
        this.toastr.success('The new Bill succesfully added', 'Bill payment completed');
        this.dialog.close();
      }else{
        this.toastr.error("Sorry, You don't have enough balance to do this transaction","Error")
      }
    });
   

   
  }

}
class Bill{
  amount : number
  Ref : string
  Type:string
}
