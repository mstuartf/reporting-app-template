import { IonicPage, ModalController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { Component } from '@angular/core';

import { SettingsPage } from '@pages/settings/settings';
import { ListPage } from '@pages/list/list';


@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root = ListPage;
	tab2Root = SettingsPage;

	showFab = true;

	constructor(public modalCtrl: ModalController, private platform: Platform, private keyboard: Keyboard) {

		this.platform.ready().then(() => {

            this.keyboard.onKeyboardShow().subscribe(() => {
                this.showFab = false;
            });

            this.keyboard.onKeyboardHide().subscribe(() => {
                this.showFab = true;
            });
            
		});

	}

	// open NewPage as a modal (not as part of the nav stack)
	createNew () {
		let modal = this.modalCtrl.create('NewPage')
		modal.present();
	}

}
