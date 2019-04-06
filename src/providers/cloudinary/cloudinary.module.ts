// this is a helper module so we only need to set the cloudinary config in one place
// all modules that use the cloudinary SDK should just import CloudinaryImgModule

import { NgModule } from '@angular/core'

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { CloudinaryImgService } from './cloudinary.service';
import { cloudinaryConfig } from './cloudinary.config';


@NgModule({
  imports: [
  	CloudinaryModule.forRoot(Cloudinary, { cloud_name: cloudinaryConfig.cloudName} as CloudinaryConfiguration)
  ],
  exports: [
  	CloudinaryModule
  ],
  providers: [
  	CloudinaryImgService
  ]
})
export class CloudinaryImgModule {}
