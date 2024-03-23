import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  private user: User | null;

  constructor(private router: Router, private auth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    this.authSuccess();
  }

  login(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
