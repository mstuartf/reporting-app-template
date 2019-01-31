import { Action } from '@ngrx/store'

import { IssueObject, IssueError } from '@models/issues/issue.interface'

////////////////////////////////////////////////////////////////////////////
// TYPES ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const GET_DETAIL_REQUEST = '[Get] DETAIL'
export const GET_DETAIL_SUCCESS = '[Get] DETAIL Success'
export const GET_DETAIL_FAILURE = '[Get] DETAIL Failure'

export const WIPE_DETAIL = '[Wipe] DETAIL'

////////////////////////////////////////////////////////////////////////////
// ACTIONS /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export class GetDetail implements Action {
  readonly type = GET_DETAIL_REQUEST
  constructor(public payload: number) {}
}

export class GetDetailSuccess implements Action {
  readonly type = GET_DETAIL_SUCCESS
  constructor(public payload: IssueObject) {}
}

export class GetDetailFailure implements Action {
  readonly type = GET_DETAIL_FAILURE
  constructor(public payload: IssueError) {}
}

export class WipeDetail implements Action {
  readonly type = WIPE_DETAIL
  constructor() {}
}

////////////////////////////////////////////////////////////////////////////
// EXPORT //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export type Actions = GetDetail | GetDetailSuccess | GetDetailFailure | WipeDetail

