import * as AuthActions from '@actions/auth/auth.actions'
import * as UserActions from '@actions/users/user.actions'


// all actions are passing through the metareducers before being handed over to the feature reducers
export function metaReducer(reducer) {

	return function(state, action) {

		switch (action.type) {

			case AuthActions.LOGOUT_SUCCESS:
				return {}

			case UserActions.DELETE_USER_SUCCESS:
				return {}

			default:
				return reducer(state, action)

		}
	}

}
