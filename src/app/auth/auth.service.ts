import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseService } from '../training/exercise.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../shared/ui.reducer';
import { setAuthenticated, setUnauthenticated } from './auth.reducer';
import * as fromRoot from '../app.reducer';
@Injectable()
export class AuthService {
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
        this.store.dispatch(setAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.store.dispatch(setUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(startLoading());
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(stopLoading());
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());

        this.uiService.showSnackbar('The SignUp was unseccessful.', 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(startLoading());

    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(stopLoading());
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());

        this.uiService.showSnackbar('Wrong credentials!', 3000);
      });
  }

  logout() {
    this.auth.signOut();
  }
}
