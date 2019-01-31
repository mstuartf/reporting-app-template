import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Component } from '@angular/core'


@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {}

  login () {
  	this.navCtrl.push('LoginPage');
  }

  signup () {
  	this.navCtrl.push('SignupPage');
  }

}
