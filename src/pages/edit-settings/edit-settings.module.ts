import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { EditSettingsPage } from '@pages/edit-settings/edit-settings'


@NgModule({
	declarations: [
	EditSettingsPage,
	],
	imports: [
	TranslateModule.forChild(),
	IonicPageModule.forChild(EditSettingsPage),
	],
})
export class EditSettingsPageModule {}
