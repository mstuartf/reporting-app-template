import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { Component } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'

import * as DetailActions from '@actions/detail/detail.actions'
import { IssueService } from '@providers/issues/issue.service'
import { IssueObject } from '@models/issues/issue.interface'
import { IssueModel } from '@models/issues/issue.model'
import { AppState } from '@app/app.state'


@IonicPage({
  segment: '/:issueId'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  issueId: number
  issue: IssueModel

  onDestroy$ = new Subject()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>,
    public loadingCtrl: LoadingController,
    public issueService: IssueService) {

    // fetch the user model on entry
    this.issueId = this.navParams.get('issueId')
    this.store.dispatch(new DetailActions.GetDetail(this.issueId))

  }

  ionViewCanEnter() {

    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        content: 'Loading...'
      });

      loading.present().then(() => {
        this.store.select('detail').takeUntil(this.onDestroy$).subscribe((issue: IssueObject) => {
          if (issue) {
            this.issue = new IssueModel(issue)
            loading.dismiss()
            resolve(true)
          }
        })
      });
      
    })

  }

  ngOnDestroy() {
    this.store.dispatch(new DetailActions.WipeDetail())
    this.onDestroy$.next()
  }

}
