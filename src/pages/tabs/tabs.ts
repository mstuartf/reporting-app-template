import { IonicPage, ModalController } from 'ionic-angular'
import { Component } from '@angular/core'

import { SettingsPage } from '@pages/settings/settings'
import { ListPage } from '@pages/list/list'


@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root = ListPage;
	tab2Root = SettingsPage;

	constructor(public modalCtrl: ModalController) {}

	// open NewPage as a modal (not as part of the nav stack)
	createNew () {
		let modal = this.modalCtrl.create('NewPage')
		modal.present();
	}

}
