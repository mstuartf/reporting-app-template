
// raw type object from the backend returned by GET /issue_types/:id
export interface TypeObject {
	id: number,
	name: string
}

// results object returned by GET /issue_types
export interface TypeQuery {
	count: number,
	results: TypeObject[],
	next: any,
	previous: any
}

export interface TypeError {
	detail: string
}

