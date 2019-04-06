import { TypeModel } from '@models/types/type.model';
import { TypeQuery } from './types-list.interface';

export class TypesList {

	list: TypeModel[] = [];
	count: number;
	next: string;
	previous: string;

	constructor(raw: TypeQuery) {
		
		if (raw) {

			this.count = raw.count;
			this.next = raw.next;
			this.previous = raw.previous;

			for (var i = 0; i < raw.results.length; i++) {
				let issue = new TypeModel(raw.results[i]);
				this.list.push(issue);
			}
			
		}
		
	}

}
