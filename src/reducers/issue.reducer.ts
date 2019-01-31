import * as IssueActions from '@actions/issues/issue.actions'
import { IssueQuery } from '@models/issues/issue.interface'


export function issuesReducer(state: IssueQuery, action: IssueActions.Actions) {

	switch (action.type) {

		case IssueActions.GET_ISSUES_SUCCESS:
			return action.payload

		case IssueActions.GET_NEXT_ISSUES_SUCCESS:
			return {...state, results: [...state.results, ...action.payload.results], next: action.payload.next}

		case IssueActions.ADD_ISSUE_SUCCESS:
			return {...state, results: [...state.results, action.payload], count: state.count + 1}
		
		default:
			return state

	}

}
