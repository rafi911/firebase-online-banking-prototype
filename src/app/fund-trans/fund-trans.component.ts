import { Component, OnInit,Inject } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FundListComponent } from '../fund-list/fund-list.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-fund-trans',
  templateUrl: './fund-trans.component.html',
  styleUrls: ['./fund-trans.component.css']
})
export class FundTransComponent implements OnInit {

  Fund:Fund = new Fund;
  balance;
  constructor(private afAuth:AngularFireAuth,private db : AngularFireDatabase,private toastr: ToastrService,private route: Router,private routerActive:ActivatedRoute,
    public dialogRef: MatDialogRef<FundListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }
  
  ngOnInit() {
  }
  onSubmit(Fund: NgForm){
    if(Fund.value.amount!= null || Fund.value.senderName!= null || Fund.value.receiverNo!= null || Fund.value.city!= null
    || Fund.value.city!= null || Fund.value.country!= null){
      this.insertFund(Fund.value,this.afAuth.auth.currentUser.uid);
     
    }else{
      this.toastr.error('Your fund transaction has failed',"Error")
    }
  }


  AmountValidataion(){
    var balance = this.db.list(`Customer/Cus`)
  }

  insertFund(fund:Fund,uid){
    this.db.list(`Customer/${this.afAuth.auth.currentUser.uid}/detail`).valueChanges().subscribe(snap =>{
     // this.customer = snap;

      this.balance = snap[6]

      if(this.Fund.amount <= this.balance){
        this.db.list(`Customer/${uid}/Funds`).push({
          amount : fund.amount,
          senderName : fund.senderName,
          receiverNo : fund.receiverNo,
          receiverBankName:fund.receiverBankName,
          city : fund.city,
          country  :fund.country
        });
        var UpdatedBalance = this.balance - this.Fund.amount;
        this.db.list(`Customer/${this.afAuth.auth.currentUser.uid}`).update('detail',{
          balance : UpdatedBalance
        })
        this.toastr.success('The new fund succesfully added', 'Fund Transaction completed');
        this.dialogRef.close();


      }else{
        this.toastr.error("Sorry, You don't have enough balance to do this transaction","Error")
      }
    });

    
  }
}

class Fund{
  amount : number
  senderName : string
  receiverNo:string
  receiverBankName:string
  city:string
  country:string
}
