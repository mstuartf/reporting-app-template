import { IonicPage, NavController, LoadingController, InfiniteScroll } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { Component } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'

import { IssueService } from '@providers/issues/issue.service'
import * as IssueActions from '@actions/issues/issue.actions'
import { IssueQuery } from '@models/issues/issue.interface'
import { IssuesFeed } from '@models/issues/issue.model'
import { AppState } from '@app/app.state'


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  issueFeed: IssuesFeed

  infiniteScroll: InfiniteScroll;

  onDestroy$ = new Subject()

  constructor(
    private actions$: Actions,
    public navCtrl: NavController, 
    public issueService: IssueService,  
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    private store: Store<AppState>) {

    this.store.dispatch(new IssueActions.GetIssues())

    // callback from the infinite scroll fetch
    this.actions$.ofType(IssueActions.GET_NEXT_ISSUES_SUCCESS).do(
      () => this.infiniteScroll.complete()).takeUntil(this.onDestroy$).subscribe()

  }

  // We cannot use IonViewCanEnter for this component as it is the default tabs page.
  // If we delay this page loading using IonViewCanEnter until data load then the tabs view is empty 
  // and shows a black screen - instead we fetch the data here and use ngIfs in the template.
  ionViewWillEnter() {

    if (this.issueFeed) return

    this.translate.get('LIST.LOADING')

      .subscribe((res: string) => {

        let loading = this.loadingCtrl.create({ content: res });

        loading.present().then(() => {
          this.store.select('issues').takeUntil(this.onDestroy$).subscribe((issues: IssueQuery) => {
            if (issues) {
              this.issueFeed = new IssuesFeed(issues);
              if (loading)
                loading.dismiss();
            }
          })
        })
        
      })

  }

  fetchNext (infiniteScroll: InfiniteScroll) {
    
    if (!this.issueFeed.next) {
      infiniteScroll.complete()
      return
    }
    
    this.infiniteScroll = infiniteScroll
    this.store.dispatch(new IssueActions.GetNextIssues(this.issueFeed))

  }

  viewDetail (issueId: number) {
  	this.navCtrl.push('DetailPage', {issueId: issueId})
  }

  ngOnDestroy () {
    this.onDestroy$.next()
  }

}
