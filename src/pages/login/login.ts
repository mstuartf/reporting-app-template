import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { Component } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'

import { PasswordRequest } from '@models/auth/auth.interface'
import * as UserActions from '@actions/users/user.actions'
import * as AuthActions from '@actions/auth/auth.actions'
import { UserModel } from '@models/users/user.model'
import { AppState } from '@app/app.state'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: UserModel = new UserModel();
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private actions$: Actions,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    public store: Store<AppState>) {}

  doLogin () {

    this.translate.get('LOGIN.LOGGING_IN')

    .subscribe((res: string) => {

      this.loading = this.loadingCtrl.create({ content: res })

      this.loading.present().then(() => {
        this.loginAction()
      })
      
    })

  }

  loginAction () {

    this.store.dispatch(new AuthActions.Login(this.user))

    this.actions$.ofType(AuthActions.LOGIN_SUCCESS, AuthActions.LOGIN_FAILURE)

    .do((action: AuthActions.LoginSuccess|AuthActions.LoginFailure) => {

      if (action.type === AuthActions.LOGIN_SUCCESS)
        this.redirectToHome()

      else
        this.failurePopup(action)

    }).take(1).subscribe()

  }

  redirectToHome() {

    this.store.dispatch(new UserActions.GetUser())

    this.actions$.ofType(UserActions.UPDATE_USER_LANGUAGE).do(() => {
      this.loading.dismiss()
      this.navCtrl.push('TabsPage')
    }).take(1).subscribe()

  }

  failurePopup (action: AuthActions.LoginFailure|AuthActions.ForgotPasswordFailure) {

    this.translate.get(['LOGIN.FAILURE_POPUP.TITLE', 'LOGIN.FAILURE_POPUP.BUTTON'])

    .subscribe((res: object) => {

      this.loading.dismiss()

      let alert = this.alertCtrl.create({
        title: res['LOGIN.FAILURE_POPUP.TITLE'],
        subTitle: JSON.stringify(action.payload.error),
        buttons: [res['LOGIN.FAILURE_POPUP.BUTTON']]
      });

      alert.present()

    })
    
  }

  forgotPassword() {

    this.translate.get(['LOGIN.PASSWORD_INPUT.TITLE', 'LOGIN.PASSWORD_INPUT.MESSAGE', 'LOGIN.PASSWORD_INPUT.PLACEHOLDER', 'LOGIN.PASSWORD_INPUT.OK', 'LOGIN.PASSWORD_INPUT.CANCEL'])

    .subscribe((res: string) => {

      let alert = this.alertCtrl.create({
        title: res['LOGIN.PASSWORD_INPUT.TITLE'],
        message: res['LOGIN.PASSWORD_INPUT.MESSAGE'],
        inputs: [
        {
          name: 'email',
          placeholder: res['LOGIN.PASSWORD_INPUT.PLACEHOLDER']
        }
        ],
        buttons: [
        {
          text: res['LOGIN.PASSWORD_INPUT.CANCEL'],
          role: 'cancel'
        },
        {
          text: res['LOGIN.PASSWORD_INPUT.OK'],
          handler: data => {
            if (!data.email) return false
            this.doForgotPassword(data)
          }
        }
        ]
      });

      alert.present();
      
    })

  }

  doForgotPassword (payload: PasswordRequest) {

    this.translate.get('LOGIN.LOGGING_IN')

    .subscribe((res: string) => {

      this.loading = this.loadingCtrl.create({ content: res })

      this.loading.present().then(() => {
        this.passwordAction(payload)
      })
      
    })

  }

  passwordAction (payload: PasswordRequest) {

    this.store.dispatch(new AuthActions.ForgotPassword(payload))

    this.actions$.ofType(AuthActions.FORGOT_PASSWORD_SUCCESS, AuthActions.FORGOT_PASSWORD_FAILURE)

    .do((action: AuthActions.ForgotPasswordSuccess|AuthActions.ForgotPasswordFailure) => {

      if (action.type === AuthActions.FORGOT_PASSWORD_SUCCESS)
        this.checkEmailPopup()

      else
        this.failurePopup(action)

    }).take(1).subscribe()

  }

  checkEmailPopup () {

    this.translate.get(['LOGIN.PASSWORD_SUCCESS.TITLE', 'LOGIN.PASSWORD_SUCCESS.MESSAGE', 'LOGIN.PASSWORD_SUCCESS.BUTTON'])

    .subscribe((res: object) => {

      this.loading.dismiss()

      this.alertCtrl.create({
        title: res['LOGIN.PASSWORD_SUCCESS.TITLE'],
        message: res['LOGIN.PASSWORD_SUCCESS.MESSAGE'],
        buttons: [res['LOGIN.PASSWORD_SUCCESS.BUTTON']]
      }).present()

    })
    
  }

}
