import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { Component } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'
import { App } from 'ionic-angular'

import { UserService } from '@providers/users/user.service'
import { AuthService } from '@providers/auth/auth.service'
import * as UserActions from '@actions/users/user.actions'
import { UserObject } from '@models/users/user.interface'
import * as AuthActions from '@actions/auth/auth.actions'
import { UserModel } from '@models/users/user.model'
import { AppState } from '@app/app.state'


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user: UserModel;
  loading: Loading;
  onDestroy$ = new Subject()

  constructor(
  	public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actions$: Actions,
    private translate: TranslateService,
    public userService: UserService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    private store: Store<AppState>
    ) {

    this.store.dispatch(new UserActions.GetUser())

  }

  ionViewCanEnter() {

    if (this.user) return true;

    return new Promise((resolve, reject) => {

      this.translate.get('SETTINGS.LOADING')

      .subscribe((res: string) => {

        this.loading = this.loadingCtrl.create({ content: res });

        this.loading.present().then(() => {
          this.store.select('user').takeUntil(this.onDestroy$).subscribe((user: UserObject) => {
            if (user) {
              this.user = new UserModel(user);
              this.loading.dismiss();
              resolve(true)
            }
          })
        });        

      })

    })

  }

  editSettings (fields: string) {
    this.navCtrl.push('EditSettingsPage', {fields: fields})
  }

  settingsEdited (field: string) {

    let payload = {
      user: this.user,
      fields: [field]
    }

    this.store.dispatch(new UserActions.EditUser(payload))

  }

  confirmLogout () {

    this.translate.get(['SETTINGS.LOGOUT_POPUP.TITLE', 'SETTINGS.LOGOUT_POPUP.MESSAGE', 'SETTINGS.LOGOUT_POPUP.CANCEL', 'SETTINGS.LOGOUT_POPUP.CONFIRM'])

    .subscribe((res: object) => {

      let alert = this.alertCtrl.create({
        title: res['SETTINGS.LOGOUT_POPUP.TITLE'],
        message: res['SETTINGS.LOGOUT_POPUP.MESSAGE'],
        buttons: [
        {
          text: res['SETTINGS.LOGOUT_POPUP.CANCEL'],
          role: 'cancel'
        },
        {
          text: res['SETTINGS.LOGOUT_POPUP.CONFIRM'],
          handler: () => {
            this.doLogout();
          }
        }
        ]
      });

      alert.present();

    })

  }

  doLogout () {

    this.translate.get('SETTINGS.LOGGING_OUT')

    .subscribe((res: string) => {

      this.loading = this.loadingCtrl.create({ content: res });
      this.loading.present().then(() => {
        this.logoutAction()
      });

    })

  }

  logoutAction () {

    this.store.dispatch(new AuthActions.Logout())

    this.actions$.ofType(AuthActions.LOGOUT_SUCCESS)

    .do((action: AuthActions.LogoutSuccess) => {
        this.loading.dismiss();
        this.app.getRootNavs()[0].setRoot('SplashPage');
    }).take(1).subscribe()

  }

  confirmDeleteAccount() {

    this.translate.get(['SETTINGS.DELETE_POPUP.TITLE', 'SETTINGS.DELETE_POPUP.MESSAGE', 'SETTINGS.DELETE_POPUP.CANCEL', 'SETTINGS.DELETE_POPUP.CONFIRM'])

    .subscribe((res: object) => {

      let alert = this.alertCtrl.create({
        title: res['SETTINGS.DELETE_POPUP.TITLE'],
        message: res['SETTINGS.DELETE_POPUP.MESSAGE'],
        buttons: [
        {
          text: res['SETTINGS.DELETE_POPUP.CANCEL'],
          role: 'cancel'
        },
        {
          text: res['SETTINGS.DELETE_POPUP.CONFIRM'],
          handler: () => {
            this.doDeleteAccount();
          }
        }
        ]
      });

      alert.present();

    })

  }

  doDeleteAccount () {

    this.translate.get('SETTINGS.DELETING_ACCOUNT')

    .subscribe((res: string) => {

      this.loading = this.loadingCtrl.create({ content: res });
      this.loading.present().then(() => {
        this.deleteAccountAction()
      });

    })

  }

  deleteAccountAction () {

    this.store.dispatch(new UserActions.DeleteUser(this.user))

    this.actions$.ofType(UserActions.DELETE_USER_SUCCESS, UserActions.DELETE_USER_FAILURE)

    .do((action: UserActions.DeleteUserSuccess|UserActions.DeleteUserFailure) => {

      if (action.type === UserActions.DELETE_USER_SUCCESS)
        this.logoutAction()

      else
        this.failurePopup(action)
      
    }).take(1).subscribe()

  }

  failurePopup (action: UserActions.DeleteUserFailure) {
    
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: JSON.stringify(action.payload.detail),
      buttons: ['Dismiss']
    });
    
    alert.present()

  }

  ngOnDestroy () {
    this.onDestroy$.next()
  }

}
