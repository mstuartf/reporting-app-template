import { TypeObject } from '@models/types/type.interface';

// results object returned by GET /issue_types
export interface TypeQuery {
	count: number,
	results: TypeObject[],
	next: any,
	previous: any
}
