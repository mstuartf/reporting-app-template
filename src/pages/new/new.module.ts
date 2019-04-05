import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { NewPage } from '@pages/new/new'

import { CloudinaryImgModule } from '@providers/cloudinary/cloudinary.module';


@NgModule({
  declarations: [
    NewPage,
  ],
  imports: [
  	CloudinaryImgModule,
  	TranslateModule.forChild(),
    IonicPageModule.forChild(NewPage)
  ],
})
export class NewPageModule {}
