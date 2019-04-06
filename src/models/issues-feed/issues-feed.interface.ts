import { IssueObject } from '@models/issues/issue.interface';

// results object returned by GET /issues
export interface IssueQuery {
	count: number,
	results: IssueObject[],
	next: any,
	previous: any
}
