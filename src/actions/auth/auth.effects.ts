import { map, switchMap, catchError } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

import * as AuthActions from '@actions/auth/auth.actions'
import { AuthService } from '@providers/auth/auth.service'
import { AuthObject, AuthError } from '@models/auth/auth.interface'


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions, 
    public authService: AuthService
    ) {}

  // intercepts the LOGIN_REQUEST action and triggers a LOGIN_SUCCESS
  @Effect() 
  login$ = this.actions$.pipe(

    ofType(AuthActions.LOGIN_REQUEST),

    switchMap((action: AuthActions.Login) =>
      this.authService.login(action.payload).pipe(
        map((data: AuthObject) => {
          this.authService.setToken(data);
          return new AuthActions.LoginSuccess(data)
        }),
        catchError((err: AuthError) => {
          return of(new AuthActions.LoginFailure(err))
        })
        )
      )
    );

  @Effect() 
  signup$ = this.actions$.pipe(

    ofType(AuthActions.SIGNUP_REQUEST),

    switchMap((action: AuthActions.Signup) =>
      this.authService.signup(action.payload).pipe(
        map((data: AuthObject) => {
          this.authService.setToken(data);
          return new AuthActions.SignupSuccess(data)
        }),
        catchError((err: AuthError) => of(new AuthActions.SignupFailure(err)))
        )
      )
    );

  @Effect() 
  logout$ = this.actions$.pipe(

    ofType(AuthActions.LOGOUT),

    switchMap((action: AuthActions.Logout) =>
      this.authService.removeToken().pipe(
        map(() => {
          return new AuthActions.LogoutSuccess()
        })
        )
      )
    );

  @Effect() 
  checkStatus$ = this.actions$.pipe(

    ofType(AuthActions.STATUS_CHECK),

    switchMap((action: AuthActions.StatusCheck) =>
      this.authService.getToken().pipe(
        map((auth: AuthObject) => {
          return new AuthActions.StatusReport(auth)
        })
        )
      )
    );

  @Effect() 
  forgotPassword$ = this.actions$.pipe(

    ofType(AuthActions.FORGOT_PASSWORD_REQUEST),

    switchMap((action: AuthActions.ForgotPassword) =>
      this.authService.forgotPassword(action.payload).pipe(
        map(() => new AuthActions.ForgotPasswordSuccess()),
        catchError((err: AuthError) => of(new AuthActions.ForgotPasswordFailure(err)))
        )
      )
    );

}
