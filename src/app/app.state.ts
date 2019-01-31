import { IssueObject, IssueQuery } from '@models/issues/issue.interface'
import { UserObject } from '@models/users/user.interface'
import { AuthObject } from '@models/auth/auth.interface'
import { TypeQuery } from '@models/types/type.interface'


export interface AppState {
	readonly user: UserObject,
	readonly detail: IssueObject,
	readonly issues: IssueQuery,
	readonly types: TypeQuery,
	readonly auth: AuthObject
}

