import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { NewPage } from '@pages/new/new'


@NgModule({
  declarations: [
    NewPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(NewPage)
  ],
})
export class NewPageModule {}
