
// raw issue object from the backend returned by GET /issues/:id
export interface IssueObject {
	id: number,
	type: string,
	description: string,
	reported: string,
	images: any[]
}

// results object returned by GET /issues
export interface IssueQuery {
	count: number,
	results: IssueObject[],
	next: any,
	previous: any
}

// payload expeced by POST /issues
export interface IssuePayload {
	type: string;
	description: string;
	images: string[];
}

// error returned by GET /issues/:id
export interface IssueError {
	error: {
		detail?: String[]
	}
}

export interface AddIssueError {
	error: {
		type?: String[],
		description?: String[],
		non_field_errors?: String[]
	}
}
