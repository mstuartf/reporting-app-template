import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicStorageModule } from '@ionic/storage'
import { Camera } from '@ionic-native/camera'

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SplashPageModule } from '@pages/splash/splash.module'
import { TabsPageModule } from '@pages/tabs/tabs.module'
import { MyApp } from '@app/app.component'

import { detailReducer } from '@reducers/detail.reducer'
import { issuesReducer } from '@reducers/issue.reducer'
import { typesReducer } from '@reducers/type.reducer'
import { metaReducer } from '@reducers/meta.reducer'
import { authReducer } from '@reducers/auth.reducer'
import { userReducer } from '@reducers/user.reducer'

import { DetailEffects } from '@actions/detail/detail.effects'
import { IssueEffects } from '@actions/issues/issue.effects'
import { TypeEffects } from '@actions/types/type.effects'
import { UserEffects } from '@actions/users/user.effects'
import { AuthEffects } from '@actions/auth/auth.effects'

import { LanguageService } from '@providers/language/language.service'
import { TokenInterceptor } from '@providers/requests/requests'
import { IssueService } from '@providers/issues/issue.service'
import { TypeService } from '@providers/types/type.service'
import { UserService } from '@providers/users/user.service'
import { AuthService } from '@providers/auth/auth.service'
import { Api } from '@providers/api/api.service'

// By default ngx-translate will look for your translation json files in i18n/, but for Ionic you must change this 
// to look in the src/assets directory by creating a function that returns a new TranslateLoader:
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}


@NgModule({
  declarations: [
  MyApp
  ],
  imports: [
  BrowserModule,
  TabsPageModule,
  SplashPageModule,
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),
  IonicStorageModule.forRoot(),  // todo: why does this need to be for root?
  IonicModule.forRoot(MyApp),
  StoreModule.forRoot(
  {
    user: userReducer,
    detail: detailReducer,
    issues: issuesReducer,
    types: typesReducer,
    auth: authReducer
  }, 
  {
    metaReducers: [metaReducer]
  }),
  EffectsModule.forRoot([UserEffects, IssueEffects, DetailEffects, TypeEffects, AuthEffects]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp
  ],
  providers: [
  Api,
  UserService,
  IssueService,
  AuthService,
  LanguageService,
  TypeService,
  StatusBar,
  SplashScreen,
  Camera,
  { provide: ErrorHandler, useClass: IonicErrorHandler },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },  // attach token to all requests
  ]
})
export class AppModule {}
