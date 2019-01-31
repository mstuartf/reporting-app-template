import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { SignupCompletePage } from '@pages/signup-complete/signup-complete'


@NgModule({
  declarations: [
    SignupCompletePage,
  ],
  imports: [
  TranslateModule.forChild(),
    IonicPageModule.forChild(SignupCompletePage),
  ],
})
export class SignupCompletePageModule {}
