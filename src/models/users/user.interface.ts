
// response returned from GET /rest-auth/user <-- this is also the raw structure that is saved in the store
export interface UserObject {
	username: string,
	email: string,
	first_name?: string,
	last_name?: string,
	pk: number
}

export interface LoginPayload {
	username: string,
	email: string,
	password: string
}

export interface SignupPayload {
	username: string,
	email: string,
	password1: string,
	password2: string
}

export interface UserError {
	detail: string
}
