import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { DetailPage } from '@pages/detail/detail'

import { CloudinaryImgModule } from '@providers/cloudinary/cloudinary.module';


@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
  	CloudinaryImgModule,
  	TranslateModule.forChild(),
    IonicPageModule.forChild(DetailPage),
  ],
})
export class DetailPageModule {}
