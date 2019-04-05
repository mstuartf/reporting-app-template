import { IssueObject, IssueQuery, IssuePayload } from '@models/issues/issue.interface'
import { CloudinaryImg } from '@providers/cloudinary/cloudinary.interface';

// todo: move to own file
export interface ImgPayload {
	public_id: string;
}

export class ImgModel {
	publicId: string;
	constructor(data: CloudinaryImg) {
		this.publicId = data.public_id;	
	}
	public get create(): ImgPayload {
		return {
			public_id: this.publicId
		}
	}
}

export class IssueModel {

	id: number;
	type: string;
	description: string;
	reportedDate: any;
	images: ImgModel[] = []
	base64Strings: string[] = [];

	constructor(raw?: IssueObject) {
		
		if (raw) {
			this.id = raw.id;
			this.type = raw.type;
			this.description = raw.description;
			this.reportedDate = new Date(raw.reported);
			this.publicIds = raw.public_ids || ["uvvrz1nlrz3hvjx06plo"]
		}
		
	}

	public get create (): IssuePayload {
		const payload = {
			type: this.type,
			description: this.description,
			images: []
		};
		this.images.forEach(function(image) {
			payload.images.push(image.create);
		})
		return payload;
	}

	public setImages(cloudinaryImgs: string[]) {
		const images = [];
		cloudinaryImgs.forEach(function(cloudinaryImg) {
			images.push(new ImgModel(cloudinaryImg))
		})
		this.images = images;
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

