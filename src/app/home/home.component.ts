import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Funds = {}
  constructor(private db : AngularFireDatabase,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
   // this.selectedTab = 1;
    this.route.queryParams.subscribe(params =>{
      console.log(params.id);
      this.Funds = this.db.list(`Customer/${params.id}/Funds`).valueChanges();
      console.log(this.Funds);
  })
  }
  goHome(){

  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent.index);
  }
}
