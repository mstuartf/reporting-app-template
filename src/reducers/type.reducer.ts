import * as TypeActions from '@actions/types/type.actions'
import { TypeQuery } from '@models/types-list/types-list.interface';


export function typesReducer(state: TypeQuery, action: TypeActions.Actions) {

	switch (action.type) {

		case TypeActions.GET_TYPES_SUCCESS:
			return action.payload

		case TypeActions.WIPE_TYPES:
			return undefined
		
		default:
			return state

	}

}
