import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { DetailPage } from '@pages/detail/detail'


@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(DetailPage),
  ],
})
export class DetailPageModule {}
