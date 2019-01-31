import { map, switchMap, catchError } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

import { IssueObject, IssueQuery, IssueError, AddIssueError } from '@models/issues/issue.interface'
import { IssueService } from '@providers/issues/issue.service'
import * as IssueActions from '@actions/issues/issue.actions'


@Injectable()
export class IssueEffects {
  constructor(private actions$: Actions, public issueService: IssueService) {}

  // listens for GET_ISSUES_REQUEST action and triggers issueService.query()
  @Effect() 
  getIssues$ = this.actions$.pipe(

    ofType(IssueActions.GET_ISSUES_REQUEST),

    switchMap((action: IssueActions.GetIssues) =>
      this.issueService.query().pipe(
        map((data: IssueQuery) => new IssueActions.GetIssuesSuccess(data)),
        catchError((err: IssueError) => of(new IssueActions.GetIssuesFailure(err)))
        )
      )
    );

  // listens for GET_ISSUES_REQUEST action and triggers issueService.query()
  @Effect() 
  getNextIssues$ = this.actions$.pipe(

    ofType(IssueActions.GET_NEXT_ISSUES_REQUEST),

    switchMap((action: IssueActions.GetNextIssues) =>
      this.issueService.query(action.payload).pipe(
        map((data: IssueQuery) => new IssueActions.GetNextIssuesSuccess(data)),
        catchError((err: IssueError) => of(new IssueActions.GetNextIssuesFailure(err)))
        )
      )
    );

  // listens for ADD_ISSUE_REQUEST action and triggers issueService.add()
  @Effect() 
  addIssue$ = this.actions$.pipe(

    ofType(IssueActions.ADD_ISSUE_REQUEST),

    switchMap((action: IssueActions.AddIssue) => 
      this.issueService.add(action.payload).pipe(
        map((data: IssueObject) => new IssueActions.AddIssueSuccess(data)),  // on success
        catchError((err: AddIssueError) => of(new IssueActions.AddIssueFailure(err)))  // on failure
        )
      )
    );

}
