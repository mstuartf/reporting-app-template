import { map, switchMap, catchError } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

import { LanguageService } from '@providers/language/language.service'
import { UserObject, UserError } from '@models/users/user.interface'
import * as UserActions from '@actions/users/user.actions'
import { UserService } from '@providers/users/user.service'


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, public userService: UserService, public languageService: LanguageService) {}

  // intercepts the GET_USER_REQUEST action and triggers a GET_USER_SUCCESS
  @Effect() 
  getUser$ = this.actions$.pipe(

    ofType(UserActions.GET_USER_REQUEST),

    switchMap((action: UserActions.GetUser) =>
      this.userService.get().pipe(
        map((data: UserObject) => new UserActions.GetUserSuccess(data)),
        catchError((err: UserError) => of(new UserActions.EditUserFailure(err)))
        )
      )
    );

  // listen for EDIT_USER_REQUEST action and triggers userService.patch()
  @Effect() 
  editUser$ = this.actions$.pipe(

    ofType(UserActions.EDIT_USER_REQUEST),

    switchMap((action: UserActions.EditUser) => 
      this.userService.patch(action.payload.user, action.payload.fields).pipe(
        map((data: UserObject) => new UserActions.EditUserSuccess(data)),
        catchError((err: UserError) => of(new UserActions.EditUserFailure(err)))
        )
      )
    );

  // whenever the user state is refreshed make sure the language is updated
  @Effect() 
  localUser$ = this.actions$.pipe(

    ofType(UserActions.EDIT_USER_SUCCESS, UserActions.GET_USER_SUCCESS),

    switchMap((action: UserActions.GetUserSuccess|UserActions.EditUserSuccess) => 
      this.languageService.setLanguage().pipe(
        map(() => new UserActions.UpdateUserLanguage())
        )
      )
    )

  @Effect() 
  deleteUser$ = this.actions$.pipe(

    ofType(UserActions.DELETE_USER_REQUEST),

    switchMap((action: UserActions.DeleteUser) => 
      this.userService.delete(action.payload).pipe(
        map(() => new UserActions.DeleteUserSuccess()),
        catchError((err: UserError) => of(new UserActions.DeleteUserFailure(err)))
        )
      )
    )

}
