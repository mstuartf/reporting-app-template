import { Action } from '@ngrx/store'

import { AuthObject, AuthError, PasswordRequest } from '@models/auth/auth.interface'
import { UserModel } from '@models/users/user.model'

////////////////////////////////////////////////////////////////////////////
// TYPES ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const LOGIN_REQUEST = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export const SIGNUP_REQUEST = '[Auth] Signup';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const SIGNUP_FAILURE = '[Auth] Signup Failure';

export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';

export const STATUS_CHECK = '[Auth] Status Check';
export const STATUS_REPORT = '[Auth] Status Report';

export const FORGOT_PASSWORD_REQUEST = '[Auth] Forgot Password';
export const FORGOT_PASSWORD_SUCCESS = '[Auth] Forgot Password Success';
export const FORGOT_PASSWORD_FAILURE = '[Auth] Forgot Password Failure';

////////////////////////////////////////////////////////////////////////////
// ACTIONS /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export class Login implements Action {
  readonly type = LOGIN_REQUEST;
  constructor(public payload: UserModel) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AuthObject) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: AuthError) {}
}

export class Signup implements Action {
  readonly type = SIGNUP_REQUEST;
  constructor(public payload: UserModel) {}
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: AuthObject) {}
}

export class SignupFailure implements Action {
  readonly type = SIGNUP_FAILURE;
  constructor(public payload: AuthError) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor() {}
}

export class StatusCheck implements Action {
  readonly type = STATUS_CHECK;
  constructor () {}
}

export class StatusReport implements Action {
  readonly type = STATUS_REPORT;
  constructor (public payload: AuthObject) {}
}

export class ForgotPassword implements Action {
  readonly type = FORGOT_PASSWORD_REQUEST;
  constructor(public payload: PasswordRequest) {}
}

export class ForgotPasswordSuccess implements Action {
  readonly type = FORGOT_PASSWORD_SUCCESS;
  constructor() {}
}

export class ForgotPasswordFailure implements Action {
  readonly type = FORGOT_PASSWORD_FAILURE;
  constructor(public payload: AuthError) {}
}

////////////////////////////////////////////////////////////////////////////
// EXPORT //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export type Actions = Login | LoginSuccess | LoginFailure | Logout | LogoutSuccess | StatusCheck | StatusReport | Signup | SignupSuccess | SignupFailure | ForgotPassword | ForgotPasswordSuccess | ForgotPasswordFailure;

