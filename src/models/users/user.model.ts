import { UserObject, LoginPayload, SignupPayload } from '@models/users/user.interface'

export class UserModel {

	id: number;
	emailAddress: string;
	password: string;
	firstName: string;
	lastName: string;
	pushNotifications: boolean;
	emailNotifications: boolean;
	mobileNumber: string;
	language: string = 'en';

	isSuperUser: boolean = false;
	slowMode: boolean = false;
	showCodes: boolean = false;

	constructor(raw?: UserObject) {
		
		if (raw) {

			this.id = raw.pk;
			this.emailAddress = raw.email;
			this.firstName = raw.first_name;
			this.lastName = raw.last_name;

			// fake info till endpoint returns more
			this.pushNotifications = true;
			this.emailNotifications = false;
			this.mobileNumber = '07889941666'

		}
		
	}

	get loginPayload (): LoginPayload {
		return {
			username: this.emailAddress,
			email: this.emailAddress,
			password: this.password
		}
	}

	get signupPayload (): SignupPayload {
		return {
			username: this.emailAddress,
			email: this.emailAddress,
			password1: this.password,
			password2: this.password
		}
	}

	getPatchPayload (fields: string[]) {
		console.warn('Need to use proper json mapping to build payload!!');
		let tempMap: any = {
			emailAddress: 'email',
			firstName: 'first_name',
			lastName: 'last_name'
		}
		let payload = {};
		for (var i = 0; i < fields.length; i++) {
			payload[tempMap[fields[i]]] = this[fields[i]]
		}
		return payload
	}

}
