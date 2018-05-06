import { Component, OnInit,HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authState: any = null;
  user = {}
  constructor(public authService: AuthServiceService,private afAuth:AngularFireAuth,private router:Router) 
  { 
    this.afAuth.authState.subscribe((auth)=>{
     if(auth){
       this.router.navigate['/fundList']
     }
    });
  }
  
  ngOnInit() {
  }
  // onSubmit(Form:NgForm) {
  //   return this.afAuth.auth.signInWithPopup(
  //     new firebase.auth.GoogleAuthProvider()

  //   ).then((user)=>{
  //     console.log(user.additionalUserInfo.profile.id)
  //   })
  // }
  onSubmit(form:NgForm): void {
    this.loginWithEmail(form.value.email, form.value.password)
        .then((user)=>{
        })
        .catch(_error => {
          this.router.navigate([''])
        })  
  }
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        //console.log(user.uid)
        this.router.navigate(['/home'],{ queryParams: { id: user.uid },skipLocationChange: true})
        //,skipLocationChange: true
        // this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

//   emailLogin(email:string, password:string) {
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.authState = user
//         //this.updateUserData()
//       })
//       .catch(error => console.log(error));
//  }

}

class User {
  constructor(parameters) {
    
  }
  userName : string;
  password:string;
}