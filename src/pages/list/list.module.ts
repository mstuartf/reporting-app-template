import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { NgModule } from '@angular/core'

import { ListPage } from '@pages/list/list'

import { CloudinaryImgModule } from '@providers/cloudinary/cloudinary.module';


@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
  	CloudinaryImgModule,
  	TranslateModule.forChild(),
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
