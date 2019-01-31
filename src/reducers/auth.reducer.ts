import * as AuthActions from '@actions/auth/auth.actions'
import { AuthObject } from '@models/auth/auth.interface'


// handles changes to the saved UserObject model
export function authReducer(
	state: AuthObject, 
	action: AuthActions.Actions
	) {

	switch (action.type) {
		
		default:
			return state

	}

}
