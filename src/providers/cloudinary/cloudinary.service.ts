import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CloudinaryImg } from '@models/img/img.interface';

const cloudName = 'deo77u4jf';
const unsignedUploadPreset = "png1qlbk";
const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

@Injectable()
export class CloudinaryImgService {

  	constructor() {}

	upload(file: string) {

		return new Observable((observer) => {
		
			var xhr = new XMLHttpRequest();
			var fd = new FormData();

			xhr.open('POST', url, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

			xhr.onreadystatechange = function(e) {
			  if (xhr.readyState == 4 && xhr.status == 200) {
			  	const cloudinaryImg = JSON.parse(xhr.responseText) as CloudinaryImg;
			  	observer.next(cloudinaryImg);
			  	observer.complete();
			  }
			};

			fd.append('upload_preset', unsignedUploadPreset);
			fd.append('file', file);
			xhr.send(fd);
			
			return {unsubscribe: () => {}};

		});

	}

}
