import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TableService } from './table.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private _snackBar:MatSnackBar,private fireAuth: AngularFireAuth, private router: Router) {
    // this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user != null) {

    } else {
      this.fireAuth.authState.subscribe((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
          this.router.navigate(["/home"]);
        }
      });
    }

  }
  registerWithEmail(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this._snackBar.open("Susscess fully register user "+email,"",{duration:2000});
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  loginWithEmail(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this._snackBar.open("Susscess fully login with user "+email,"",{duration:2000});
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  loginWithGg() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    try {
      return this.fireAuth.signInWithPopup(provider).then(
        ()=>{
          this._snackBar.open("Susscess fully login with google ","",{duration:2000});

        }
      );


    }
    catch (err) {
      // alert(err);
    }

  }
  
  signOut() {
    try {
      this.fireAuth.signOut().then(
        ()=>{
          this._snackBar.open("Susscess fully logout","",{duration:2000});

        }
      );
      localStorage.setItem('user', null);
      this.user = null;
      this.router.navigate(["/loginPage"]);
      
    } catch (err) {
      // alert("Sigout failed");

    }
  }

}
