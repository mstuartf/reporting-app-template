import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Component } from '@angular/core'
import { App } from 'ionic-angular'


@IonicPage()
@Component({
  selector: 'page-signup-complete',
  templateUrl: 'signup-complete.html',
})
export class SignupCompletePage {

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  backToSplash () {
  	this.app.getRootNavs()[0].setRoot('SplashPage')
  }

}
