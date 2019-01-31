import { map, switchMap, catchError } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

import * as DetailActions from '@actions/detail/detail.actions'
import { IssueService } from '@providers/issues/issue.service'
import { IssueObject, IssueError } from '@models/issues/issue.interface'


@Injectable()
export class DetailEffects {
  constructor(private actions$: Actions, public issueService: IssueService) {}

  // listens for GET_DETAIL_REQUEST action and triggers issueService.get()
  @Effect() 
  getDetails$ = this.actions$.pipe(

    ofType(DetailActions.GET_DETAIL_REQUEST),

    switchMap((action: DetailActions.GetDetail) =>
      this.issueService.get(action.payload).pipe(
        map((data: IssueObject) => new DetailActions.GetDetailSuccess(data)),
        catchError((err: IssueError) => of(new DetailActions.GetDetailFailure(err)))
        )
      )
    );

}
