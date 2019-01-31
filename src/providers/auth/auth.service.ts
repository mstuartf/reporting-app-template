import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Observable } from 'rxjs'

import { AuthObject, PasswordRequest } from '@models/auth/auth.interface'
import { UserModel } from '@models/users/user.model'
import { Api } from '@providers/api/api.service'

import { timer } from 'rxjs/observable/timer';


@Injectable()
export class AuthService {

	authKey: string = 'accessToken';

	constructor(public api: Api, public storage: Storage) {}

	login(user: UserModel) {
		return this.api.post<AuthObject>('rest-auth/login', user.loginPayload)
	}

	signup(user: UserModel) {
		return this.api.post<AuthObject>('rest-auth/registration', user.signupPayload)
	}

	removeToken() {
		return Observable.fromPromise(this.storage.remove(this.authKey))
	}

	getToken() {
		return Observable.fromPromise(this.storage.get(this.authKey))
	}

	setToken(auth: AuthObject) {
		return Observable.fromPromise(this.storage.set(this.authKey, auth))
	}

	forgotPassword(info: PasswordRequest) {
		return timer(2000)
	}

}
