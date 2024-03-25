import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseService } from '../training/exercise.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../shared/ui.reducer';
import * as fromRoot from '../app.reducer';
import { setAuthenticated, setUnauthenticated } from './auth.reducer';
@Injectable()
export class AuthService {
  // authChange = new Subject<boolean>();

  // private isAuthenticated = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private exerciseService: ExerciseService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(setAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        // this.authChange.next(false);
        this.store.dispatch(setUnauthenticated());
        this.router.navigate(['/login']);
        // this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(startLoading());
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoading());
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoading());

        this.uiService.showSnackbar('The SignUp was unseccessful.', 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(startLoading());

    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoading());
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoading());

        this.uiService.showSnackbar('Wrong credentials!', 3000);
      });
  }

  logout() {
    this.auth.signOut();
  }
}
