import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthServiceService {

  authState: any = null;
  constructor(private afAuth:AngularFireAuth) { }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
}
