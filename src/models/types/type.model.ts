import { TypeObject, TypeQuery } from '@models/types/type.interface'

export class TypeModel {

	id: number;
	name: string;

	constructor(raw?: TypeObject) {
		
		if (raw) {
			this.id = raw.id;
			this.name = raw.name;
		}

	}

}

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
