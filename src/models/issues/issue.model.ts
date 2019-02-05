import { IssueObject, IssueQuery, IssuePayload } from '@models/issues/issue.interface'

export class IssueModel {

	id: number;
	type: string;
	description: string;
	reportedDate: any;
	images: string[] = []

	constructor(raw?: IssueObject) {
		
		// todo: images not currently saved on backend so using placeholders
		if (raw) {
			this.id = raw.id;
			this.type = raw.type;
			this.description = raw.description;
			this.reportedDate = new Date(raw.reported);
			this.images = [`assets/imgs/fake/${(raw.id % 5) + 1}.jpeg`, `assets/imgs/fake/${(raw.id % 5) + 2 > 5 ? 1 : (raw.id % 5) + 2}.jpeg`]
		}
		
	}

	get create (): IssuePayload {
		return {
			type: this.type,
			description: this.description
		}
	}

}

export class IssuesFeed {

	list: IssueModel[] = [];
	count: number;
	next: boolean;

	constructor(raw?: IssueQuery) {
		
		if (raw) {

			this.count = raw.count;
			this.next = !!raw.next

			for (var i = 0; i < raw.results.length; i++) {
				let issue = new IssueModel(raw.results[i]);
				this.list.push(issue);
			}
			
		}
		
	}

}

