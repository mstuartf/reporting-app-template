import { UserObject, UserError } from '@models/users/user.interface'
import { UserModel } from '@models/users/user.model'
import { Action } from '@ngrx/store'

////////////////////////////////////////////////////////////////////////////
// TYPES ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const EDIT_USER_REQUEST = '[Patch] User';
export const EDIT_USER_SUCCESS = '[Patch] User Success';
export const EDIT_USER_FAILURE = '[Patch] User Failure';

export const GET_USER_REQUEST = '[Get] USER';
export const GET_USER_SUCCESS = '[Get] USER Success';
export const GET_USER_FAILURE = '[Get] USER Failure';

export const UPDATE_USER_LANGUAGE = '[Update] User Language'

export const DELETE_USER_REQUEST = '[Delete] User';
export const DELETE_USER_SUCCESS = '[Delete] User Success';
export const DELETE_USER_FAILURE = '[Delete] User Failure';

////////////////////////////////////////////////////////////////////////////
// ACTIONS /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export class GetUser implements Action {
  readonly type = GET_USER_REQUEST;
  constructor() {}
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;
  constructor(public payload: UserObject) {}
}

export class GetUserFailure implements Action {
  readonly type = GET_USER_FAILURE;
  constructor(public payload: UserError) {}
}

export class EditUser implements Action {
	readonly type = EDIT_USER_REQUEST;
	constructor(public payload: { user: UserModel, fields: string[] }) {}
}

export class EditUserSuccess implements Action {
	readonly type = EDIT_USER_SUCCESS;
	constructor(public payload: UserObject) {}
}

export class EditUserFailure implements Action {
  readonly type = EDIT_USER_FAILURE;
  constructor(public payload: UserError) {}
}

export class UpdateUserLanguage implements Action {
  readonly type = UPDATE_USER_LANGUAGE;
  constructor() {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER_REQUEST;
  constructor(public payload: UserModel) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = DELETE_USER_SUCCESS;
  constructor() {}
}

export class DeleteUserFailure implements Action {
  readonly type = DELETE_USER_FAILURE;
  constructor(public payload: UserError) {}
}

////////////////////////////////////////////////////////////////////////////
// EXPORT //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export type Actions = GetUser | GetUserSuccess | GetUserFailure | EditUser | EditUserSuccess | EditUserFailure | UpdateUserLanguage | DeleteUser | DeleteUserSuccess | DeleteUserFailure;

