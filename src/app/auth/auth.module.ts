import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModue } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AuthRoutingModue,
  ],
  exports: [],
})
export class AuthModule {}
