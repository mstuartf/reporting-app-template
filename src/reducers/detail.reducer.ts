import * as DetailActions from '@actions/detail/detail.actions'
import { IssueObject } from '@models/issues/issue.interface'


// handles changes to the saved UserObject model
export function detailReducer(state: IssueObject, action: DetailActions.Actions) {

	switch (action.type) {

		case DetailActions.GET_DETAIL_SUCCESS:
			return action.payload

		case DetailActions.WIPE_DETAIL:
			return undefined
		
		default:
			return state

	}

}
