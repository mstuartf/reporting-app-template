import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { Component } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'

import { UserService } from '@providers/users/user.service'
import * as UserActions from '@actions/users/user.actions'
import { UserObject } from '@models/users/user.interface'
import { UserModel } from '@models/users/user.model'
import { AppState } from '@app/app.state'


@IonicPage()
@Component({
	selector: 'page-edit-settings',
	templateUrl: 'edit-settings.html',
})
export class EditSettingsPage {

	fields: Array<string>
	loading: Loading
	user: UserModel
	
	onDestroy$ = new Subject()

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService,
		private actions$: Actions,
		public alertCtrl: AlertController,
		public translate: TranslateService,
		public loadingCtrl: LoadingController,
		private store: Store<AppState>
		) {

		// subscribe to the user store until the component is destroyed
		this.store.select('user').takeUntil(this.onDestroy$).subscribe((user: UserObject) => {
			this.user = new UserModel(user)
		});

	}

	ionViewCanEnter() {
		this.fields = this.navParams.get('fields').split(',')
		return true;
	}

	saveChanges () {

		this.translate.get('EDIT_SETTINGS.SAVING')

		.subscribe((res: string) => {
			this.loading = this.loadingCtrl.create({ content: res })
			this.loading.present().then(() => this.editUserAction());

		})

	}

	editUserAction () {

		let payload = {
			user: this.user,
			fields: this.fields
		}

		this.store.dispatch(new UserActions.EditUser(payload))

		this.actions$.ofType(UserActions.UPDATE_USER_LANGUAGE, UserActions.EDIT_USER_FAILURE)

		.do((action: UserActions.UpdateUserLanguage|UserActions.EditUserFailure) => {
			
			this.loading.dismiss()
			
			if (action.type === UserActions.UPDATE_USER_LANGUAGE)
				this.navCtrl.pop()

			else
				this.failurePopup(action)

		}).take(1).subscribe()

	}

	failurePopup (action: UserActions.EditUserFailure) {
		
		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: JSON.stringify(action.payload.error),
			buttons: ['Dismiss']
		});
		
		alert.present()

	}

	ngOnDestroy() {
		this.onDestroy$.next()
	}

}

