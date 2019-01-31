// response returned by POST /rest-auth/registration and POST /rest-auth/login
export interface AuthObject {
	key: string
}

export interface AuthError {
	error: {
		email?: String[],
		password?: String[],
		non_field_errors?: String[]
	}
}

export interface PasswordRequest {
	email: string
}
