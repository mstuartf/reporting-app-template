import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular'
import {Validators, FormBuilder, FormGroup } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { Component } from '@angular/core'
import { ViewChild } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Slides } from 'ionic-angular'
import { Navbar } from 'ionic-angular'
import { App } from 'ionic-angular'
import { Store } from '@ngrx/store'

import { AuthService } from '@providers/auth/auth.service'
import * as UserActions from '@actions/users/user.actions'
import * as AuthActions from '@actions/auth/auth.actions'
import { UserModel } from '@models/users/user.model'
import { AppState } from '@app/app.state'


@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	@ViewChild('signupSlider') slides: Slides
	@ViewChild('navBar') navBar: Navbar

	loading: Loading

	signupForm1: FormGroup
	signupForm2: FormGroup

	form1Attempt: boolean = false
	form2Attempt: boolean = false

	user: UserModel

	slideIndex: number = 0

	constructor(
		public app: App,
		public navCtrl: NavController, 
		public navParams: NavParams,
		private actions$: Actions,
		public authService: AuthService,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private translate: TranslateService,
		private formBuilder: FormBuilder,
		public store: Store<AppState>
		) {

		this.signupForm1 = this.formBuilder.group({
			emailAddress: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(8)]]
		})

		this.signupForm2 = this.formBuilder.group({
			lastName: ['', Validators.required],
			firstName:  ['', Validators.required],
			confirmedTerms: [false, Validators.requiredTrue]
		})

		
	}

	doSignup () {

		this.form2Attempt = true;
		
		if (!this.signupForm2.valid)
			return

		this.user = new UserModel()
		Object.assign(this.user, this.signupForm1.value)
		Object.assign(this.user, this.signupForm2.value)

		this.translate.get('SIGNUP.SIGNING_UP')

		.subscribe((res: string) => {

			this.loading = this.loadingCtrl.create({ content: res })
			this.loading.present().then(() => {
				this.signupAction()
			});

		})

	}

	signupAction () {

		this.store.dispatch(new AuthActions.Signup(this.user))

		this.actions$.ofType(AuthActions.SIGNUP_SUCCESS, AuthActions.SIGNUP_FAILURE)

		.do((action: AuthActions.SignupSuccess|AuthActions.SignupFailure) => {

			if (action.type === AuthActions.SIGNUP_SUCCESS)
				this.patchUserAction()

			else
				this.failurePopup(action)
			
		}).take(1).subscribe()

	}

	patchUserAction () {

		let payload = {
			user: this.user,
			fields: Object.keys(this.signupForm2.controls)
		}
		
		this.store.dispatch(new UserActions.EditUser(payload))

		this.actions$.ofType(UserActions.UPDATE_USER_LANGUAGE)

		.do((action: UserActions.UpdateUserLanguage) => {
			this.logoutAction()
		}).take(1).subscribe()

	}

	logoutAction() {

		this.store.dispatch(new AuthActions.Logout())

		this.actions$.ofType(AuthActions.LOGOUT_SUCCESS)

		.do((action: AuthActions.LogoutSuccess) => {
			this.loading.dismiss().then(() => this.app.getRootNavs()[0].setRoot('SignupCompletePage'));
		}).take(1).subscribe()

	}

	failurePopup (action: AuthActions.SignupFailure) {

		this.loading.dismiss()

		this.translate.get(['SIGNUP.FAILURE_POPUP.TITLE', 'SIGNUP.FAILURE_POPUP.BUTTON'])

		.subscribe((res: object) => {

			let alert = this.alertCtrl.create({
				title: res['SIGNUP.FAILURE_POPUP.TITLE'],
				subTitle: JSON.stringify(action.payload.error),
				buttons: [res['SIGNUP.FAILURE_POPUP.BUTTON']]
			});

			alert.present();

		})

	}

	// hijack the default nav bar behaviour to control slides
	// (wait till view is rendered or the element won't exist)
	ngAfterViewInit() {
		this.navBar.backButtonClick = () => {
			if (this.slides._activeIndex > 0)
				this.slides.slidePrev()
			else 
				this.navCtrl.pop()
		}
	}

	updateSlideIndex() {
		this.slideIndex = this.slides.getActiveIndex()
	}

	nextSlide() {

		this.form1Attempt = true
		
		if (!this.signupForm1.valid)
			return

		this.slides.slideNext()

	}

}
