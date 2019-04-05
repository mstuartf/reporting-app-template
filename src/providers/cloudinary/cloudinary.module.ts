// this is a helper module so we only need to set the cloudinary config in one place
// all modules that use the cloudinary SDK should just import CloudinaryImgModule

import { NgModule } from '@angular/core'

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

@NgModule({
  imports: [
  	CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'deo77u4jf'} as CloudinaryConfiguration)
  ],
  exports: [
  	CloudinaryModule
  ]
})
export class CloudinaryImgModule {}
