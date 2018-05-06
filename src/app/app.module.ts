import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FundTransComponent } from './fund-trans/fund-trans.component';
import { FundListComponent } from './fund-list/fund-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { FormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToastrModule } from 'ngx-toastr';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillComponent } from './bill/bill.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { AuthServiceService } from './auth-service.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { AngularFirestoreModule } from 'angularfire2/firestore';




const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'fundList',      component: FundListComponent },
  { path: 'fund',      component: FundTransComponent },
  { path: 'billList',      component: BillListComponent },
  { path: 'bill',      component: BillComponent },
  { path: 'profile',      component: CustomerComponent }
 
];
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    FundTransComponent,
    FundListComponent,
    HomeComponent,
    BillListComponent,
    BillComponent,
    LoginComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSidenavModule,FormsModule,MatCardModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),AngularFireModule.initializeApp(config),AngularFireDatabaseModule,MatListModule,MatIconModule,ToastrModule.forRoot(),AngularFireAuthModule,
    MatTabsModule,MatDialogModule,MatSelectModule,AngularFirestoreModule
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }
