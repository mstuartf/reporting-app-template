import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { SettingsPageModule } from '@pages/settings/settings.module'
import { ListPageModule } from '@pages/list/list.module'
import { TabsPage } from '@pages/tabs/tabs'


@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
  	ListPageModule,
  	SettingsPageModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(TabsPage),
  ],
  entryComponents: [
    TabsPage,
  ],
})
export class TabsPageModule {}
