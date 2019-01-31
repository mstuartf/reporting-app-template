import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { ListPage } from '@pages/list/list'


@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
