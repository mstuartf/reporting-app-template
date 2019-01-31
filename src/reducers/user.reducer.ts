import * as UserActions from '@actions/users/user.actions'
import { UserObject } from '@models/users/user.interface'

// handles changes to the saved UserObject model
export function userReducer(
	state: UserObject, 
	action: UserActions.Actions
	) {

	switch (action.type) {

		case UserActions.EDIT_USER_SUCCESS:
			return action.payload

		case UserActions.GET_USER_SUCCESS:
			return action.payload
		
		default:
			return state

	}

}
