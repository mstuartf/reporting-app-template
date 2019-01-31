import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { SplashPage } from './splash';


@NgModule({
  declarations: [
    SplashPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(SplashPage),
  ],
})
export class SplashPageModule {}
