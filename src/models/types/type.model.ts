import { TypeObject } from '@models/types/type.interface'

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
