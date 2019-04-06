import { IssueObject, IssueQuery, IssuePayload } from '@models/issues/issue.interface'
import { ImgModel } from '@models/img/img.model';
import { CloudinaryImg } from '@models/img/img.interface';

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

			const imgModels = [];
			raw.images.forEach((rawImg) => {
				imgModels.push(new ImgModel(rawImg))
			})

			this.images = imgModels;

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

	// this function maps an array of Cloudinary images to the .images property
	public setImages(cloudinaryImgs: CloudinaryImg[]) {

		const images = [];
		cloudinaryImgs.forEach(function(cloudinaryImg) {
			const image = new ImgModel();
			image.loadCloudinaryImg(cloudinaryImg);
			images.push(image)
		})

		this.images = images;

	}

}

// todo: move this to separate file
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

