import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { SettingsPage } from '@pages/settings/settings'


@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
