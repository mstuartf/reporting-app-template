import { Action } from '@ngrx/store'

import { IssueObject, IssueError, AddIssueError } from '@models/issues/issue.interface';
import { IssueModel } from '@models/issues/issue.model';
import { IssueQuery } from '@models/issues-feed/issues-feed.interface';
import { IssuesFeed } from '@models/issues-feed/issues-feed.model';

////////////////////////////////////////////////////////////////////////////
// TYPES ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const GET_ISSUES_REQUEST = '[Get] ISSUE'
export const GET_ISSUES_SUCCESS = '[Get] ISSUE Success'
export const GET_ISSUES_FAILURE = '[Get] ISSUE Failure'

export const GET_NEXT_ISSUES_REQUEST = '[Get] NEXT ISSUES'
export const GET_NEXT_ISSUES_SUCCESS = '[Get] NEXT ISSUES Success'
export const GET_NEXT_ISSUES_FAILURE = '[Get] NEXT ISSUES Failure'

export const ADD_ISSUE_REQUEST = '[Post] ISSUE'
export const ADD_ISSUE_SUCCESS = '[Post] ISSUE Success'
export const ADD_ISSUE_FAILURE = '[Post] ISSUE Failure'

////////////////////////////////////////////////////////////////////////////
// ACTIONS /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export class GetIssues implements Action {
  readonly type = GET_ISSUES_REQUEST
  constructor() {}
}

export class GetIssuesSuccess implements Action {
  readonly type = GET_ISSUES_SUCCESS
  constructor(public payload: IssueQuery) {}
}

export class GetIssuesFailure implements Action {
  readonly type = GET_ISSUES_FAILURE
  constructor(public payload: IssueError) {}
}

export class GetNextIssues implements Action {
  readonly type = GET_NEXT_ISSUES_REQUEST
  constructor(public payload: IssuesFeed) {}
}

export class GetNextIssuesSuccess implements Action {
  readonly type = GET_NEXT_ISSUES_SUCCESS
  constructor(public payload: IssueQuery) {}
}

export class GetNextIssuesFailure implements Action {
  readonly type = GET_NEXT_ISSUES_FAILURE
  constructor(public payload: IssueError) {}
}

export class AddIssue implements Action {
	readonly type = ADD_ISSUE_REQUEST
	constructor(public payload: IssueModel) {}
}

export class AddIssueSuccess implements Action {
	readonly type = ADD_ISSUE_SUCCESS
	constructor(public payload: IssueObject) {}
}

export class AddIssueFailure implements Action {
	readonly type = ADD_ISSUE_FAILURE
	constructor(public payload: AddIssueError) {}
}

////////////////////////////////////////////////////////////////////////////
// EXPORT //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export type Actions = GetIssues | GetIssuesSuccess | GetIssuesFailure | AddIssue | AddIssueSuccess | AddIssueFailure | GetNextIssues | GetNextIssuesSuccess | GetNextIssuesFailure
