import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { LoginPage } from '@pages/login/login'


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
