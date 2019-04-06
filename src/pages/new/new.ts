import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, Loading, Slides } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { TranslateService } from '@ngx-translate/core'
import { ActionSheetController } from 'ionic-angular'
import { Component, ViewChild } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'

import { IssueService } from '@providers/issues/issue.service'
import * as IssueActions from '@actions/issues/issue.actions'
import * as TypeActions from '@actions/types/type.actions'
import { TypeQuery } from '@models/types/type.interface'
import { IssueModel } from '@models/issues/issue.model'
import { TypesList } from '@models/types/type.model'
import { AppState } from '@app/app.state'

import { CloudinaryImgService } from '@providers/cloudinary/cloudinary.service';
import { CloudinaryImg } from '@models/img/img.interface';

import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  @ViewChild('browserFileInput') browserFileInput  // file input element for browser testing
  @ViewChild('imageSlider') imageSlider: Slides

  public types: TypesList;
  public loading: Loading;
  private onDestroy$ = new Subject();
  private cameraOptions: CameraOptions;
  private libraryOptions: CameraOptions;
  public base64Strings: string[] = [];  // holding array for the strings before they are saved
  public newIssue: IssueModel = new IssueModel();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    private actions$: Actions,
    public issueService: IssueService,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public cloudinaryService: CloudinaryImgService,
    private store: Store<AppState>
    ) {

    this.store.dispatch(new TypeActions.GetTypes())

    this.cameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,  // needs to be URL not URI
      mediaType: this.camera.MediaType.PICTURE
    }

    this.libraryOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,  // needs to be URL not URI
      mediaType: this.camera.MediaType.PICTURE
    }
    
  }

  ionViewCanEnter() {

    return new Promise((resolve, reject) => {

      this.translate.get('NEW.LOADING')

      .subscribe((res: string) => {

        this.loading = this.loadingCtrl.create({ content: res })
        this.loading.present().then(() => {
          this.store.select('types').takeUntil(this.onDestroy$).subscribe((types: TypeQuery) => {
            if (types) {
              this.types = new TypesList(types)
              this.loading.dismiss()
              resolve(true)
            }
          })
        });
      })

    })

  }

  closePage () {
    this.viewCtrl.dismiss()
  }

  save () {

    this.translate.get('NEW.SAVING')

    .subscribe((res: string) => {

      this.loading = this.loadingCtrl.create({ content: res })
      this.loading.present().then(() => {
        this.uploadImages()
      });

    })

  }

  addIssueAction () {

    this.store.dispatch(new IssueActions.AddIssue(this.newIssue))

    this.actions$.ofType(IssueActions.ADD_ISSUE_SUCCESS, IssueActions.ADD_ISSUE_FAILURE)

    .do((action: IssueActions.AddIssueSuccess|IssueActions.AddIssueFailure) => {

      this.loading.dismiss()

      if (action.type === IssueActions.ADD_ISSUE_SUCCESS)
        this.closePage()

      else
        this.failurePopup(action)

    }).take(1).subscribe()

  }

  failurePopup (action: IssueActions.AddIssueFailure) {

    this.translate.get(['NEW.FAILURE_POPUP.TITLE', 'NEW.FAILURE_POPUP.BUTTON'])

    .subscribe((res: object) => {

      let alert = this.alertCtrl.create({
        title: res['NEW.FAILURE_POPUP.TITLE'],
        subTitle: JSON.stringify(action.payload.error),
        buttons: [res['NEW.FAILURE_POPUP.BUTTON']]
      });

      alert.present();

    })
    
  }

  addImageActionSheet() {

    this.translate.get(['NEW.ACTION_SHEET.CAMERA', 'NEW.ACTION_SHEET.LIBRARY', 'NEW.ACTION_SHEET.CANCEL'])

    .subscribe((res: object) => {

      let actionSheet = this.actionSheetCtrl.create({

        buttons: [
        {
          text: res['NEW.ACTION_SHEET.CAMERA'],
          icon: 'camera',
          handler: () => {
            this.getNewPicture(this.cameraOptions)
          }
        },
        {
          text: res['NEW.ACTION_SHEET.LIBRARY'],
          icon: 'images',
          handler: () => {
            this.getNewPicture(this.libraryOptions)
          }
        },
        {
          text: res['NEW.ACTION_SHEET.CANCEL'],
          role: 'cancel'
        }
        ]
      });

      actionSheet.present();

    })

  }

  getNewPicture (options: CameraOptions) {

    if (!Camera['installed']())  // for browser testing
      this.browserFileInput.nativeElement.click()

    else
      this.getNativePicture(options)  

  }

  getNativePicture(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        this.handleNativeImage(imageData)
      }, 
      (err) => {
        console.log(err)
      }
      );
  }

  // callback for the file input element on browser
  handleBrowserImage(event) {
    if (!event.target.files.length) return  // if cancel is pressed there will be no files
      const file = event.target.files[0]
    let reader: FileReader = new FileReader()  // native JS obj for reading the contents of files stored on the user's compute
    reader.readAsDataURL(file)
    reader.onload = (readerEvent: Event) => {  // this is triggered each time the reading operation is successfully completed.
      if (typeof reader.result === 'string') {  // check the type is a string not ArrayBuffer or TS complains
        this.processBase64Image(reader.result)
      }
    }
  }

  // callback for the camera function on mobile
  handleNativeImage(imageData: string) {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.processBase64Image(base64Image)
  }

  // add new base64 string to the array, update the slider and show the new image
  processBase64Image (base64String: string) {
    this.base64Strings.push(base64String)
    this.imageSlider.update()
    setTimeout(() => {
      this.imageSlider.slideTo(this.base64Strings.length - 1)
    }, 300);
  }

  // todo: this should be handled by the store
  // this function chains the image uploads together
  private uploadImages() {

    const calls = [];
    this.base64Strings.forEach(imgString => {
      calls.push(this.cloudinaryService.upload(imgString));
    });

    Observable.forkJoin(calls).subscribe((cloudinaryImgs: CloudinaryImg[]) => {
      this.newIssue.setImages(cloudinaryImgs);
      this.addIssueAction()
    });

  }

  confirmDeleteImage() {
    
    this.translate.get(['NEW.DELETE_IMAGE.TITLE', 'NEW.DELETE_IMAGE.MESSAGE', 'NEW.DELETE_IMAGE.CANCEL', 'NEW.DELETE_IMAGE.CONFIRM'])

    .subscribe((res: object) => {

      let alert = this.alertCtrl.create({
        title: res['NEW.DELETE_IMAGE.TITLE'],
        message: res['NEW.DELETE_IMAGE.MESSAGE'],
        buttons: [
        {
          text: res['NEW.DELETE_IMAGE.CANCEL'],
          role: 'cancel'
        },
        {
          text: res['NEW.DELETE_IMAGE.CONFIRM'],
          handler: () => {
            this.doDeleteImage();
          }
        }
        ]
      });

      alert.present();

    })
  }

  doDeleteImage () {

    const index = this.imageSlider.getActiveIndex()
    
    if (this.base64Strings.length > 1)
      this.imageSlider.slidePrev()

    this.base64Strings.splice(index, 1)

  }

  ngOnDestroy() {
    this.onDestroy$.next()
    this.store.dispatch(new TypeActions.WipeTypes())
  }

}
