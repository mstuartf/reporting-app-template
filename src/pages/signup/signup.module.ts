import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { SignupPage } from '@pages/signup/signup'


@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
