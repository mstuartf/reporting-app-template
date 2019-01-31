import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { ISubscription } from "rxjs/Subscription"
import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'

import { LanguageService } from '@providers/language/language.service'
import { AuthService } from '@providers/auth/auth.service'
import * as UserActions from '@actions/users/user.actions'
import * as AuthActions from '@actions/auth/auth.actions'
import { SplashPage } from '@pages/splash/splash'
import { TabsPage } from '@pages/tabs/tabs'
import { AppState } from '@app/app.state'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage
  userSub: ISubscription
  statusSub: ISubscription
  languageSub: ISubscription

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private actions$: Actions,
    public authService: AuthService,
    public language: LanguageService,
    private store: Store<AppState>
    ) {

    platform.ready().then(() => { 
      statusBar.styleDefault();  // todo: what does this do?
      this.store.dispatch(new AuthActions.StatusCheck())  // check to see if they are logged in
    });

    this.statusSub = this.actions$.ofType(AuthActions.STATUS_REPORT).do(

      (action: AuthActions.StatusReport) => {

        this.statusSub.unsubscribe()
        
        if (action.payload && action.payload.key)
          this.redirectToHome()
        
        else 
          this.redirectToSplash()
        
      }).subscribe()

  }

  redirectToSplash() {
    this.languageSub = this.language.setLanguage().subscribe(() => {
      this.splashScreen.hide()
      this.rootPage = SplashPage
      this.languageSub.unsubscribe()
    })
  }

  redirectToHome() {

    this.store.dispatch(new UserActions.GetUser())

    this.userSub = this.actions$.ofType(UserActions.UPDATE_USER_LANGUAGE).do(

      (action: UserActions.UpdateUserLanguage) => {

        this.userSub.unsubscribe()
        this.splashScreen.hide()
        this.rootPage = TabsPage
        
      }).subscribe()

  }

}

