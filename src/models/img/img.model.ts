import { ImgPayload, CloudinaryImg, ImgObject } from './img.interface';

export class ImgModel {

	publicId: string;

	constructor(data?: ImgObject) {

		if (!data) {
			return;
		}

		this.publicId = data.public_id;	

	}

	public get create(): ImgPayload {
		return {
			public_id: this.publicId
		}
	}

	public loadCloudinaryImg(data: CloudinaryImg) {
		this.publicId = data.public_id;
	}

}
