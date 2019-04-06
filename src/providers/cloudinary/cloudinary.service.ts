import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CloudinaryImg } from '@models/img/img.interface';

import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state'

import { UserModel } from '@models/users/user.model';
import { UserObject } from '@models/users/user.interface'

import { cloudinaryConfig } from './cloudinary.config';

@Injectable()
export class CloudinaryImgService {

  	private cloudName: string = cloudinaryConfig.cloudName;
	private uploadPreset: string = cloudinaryConfig.uploadPreset;
	private masterFolderPath: string = cloudinaryConfig.masterFolderPath;

	private user: UserModel;
	private uploadUrl: string = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;

	constructor(private store: Store<AppState>) {
		this.store.select('user').subscribe((user: UserObject) => {
			this.user = new UserModel(user)
		});
	}

	private get publicId(): string {
		const timeStamp = new Date().toISOString();
		return `${this.masterFolderPath}/${this.user.emailAddress}/${timeStamp}`;
	}

	upload(file: string) {

		return new Observable((observer) => {
		
			var xhr = new XMLHttpRequest();
			var fd = new FormData();

			xhr.open('POST', this.uploadUrl, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

			xhr.onreadystatechange = function(e) {
			  if (xhr.readyState == 4 && xhr.status == 200) {
			  	const cloudinaryImg = JSON.parse(xhr.responseText) as CloudinaryImg;
			  	observer.next(cloudinaryImg);
			  	observer.complete();
			  }
			};

			fd.append('upload_preset', this.uploadPreset);
			fd.append('public_id', this.publicId);
			fd.append('file', file);
			xhr.send(fd);
			
			return {unsubscribe: () => {}};

		});

	}

}
