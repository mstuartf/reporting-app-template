import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Config } from 'ionic-angular'
import { Store } from '@ngrx/store'

import { UserObject } from '@models/users/user.interface'
import { UserModel } from '@models/users/user.model'
import { AppState } from '@app/app.state'


@Injectable()
export class LanguageService {

  onDestroy$ = new Subject()
  user: UserModel;

  constructor(
    public translate: TranslateService, 
    private config: Config,
    private store: Store<AppState>) { 

    // subscribe to the user store
    this.store.select('user').takeUntil(this.onDestroy$).subscribe((user: UserObject) => {
      this.user = new UserModel(user)
    });

    // need to reset the ios back button text for all pages
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.get(['NAV.BACK']).subscribe(values => {
          this.config.set('ios', 'backButtonText', values['NAV.BACK'])
        });
      });

  }

  // this function sets the language based on the user info in the store or defaults to en
  setLanguage() {

    let language, defaultLanguage = 'en'

    const browserLanguage = this.translate.getBrowserLang()

    if (!this.user && browserLanguage) {
      language = this.translate.getBrowserLang()
    }

    else if (this.user.showCodes) {
      language = 'codes'
      defaultLanguage = 'codes'
    }

    else {
      language = this.user.language
    }

    this.translate.setDefaultLang(defaultLanguage)

    return this.translate.use(language)

  }

  ngOnDestroy () {
    this.onDestroy$.next()
  }

}
