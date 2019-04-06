import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

import { TypeService } from '@providers/types/type.service'
import * as TypeActions from '@actions/types/type.actions'
import { TypeError } from '@models/types/type.interface'
import { TypeQuery } from '@models/types-list/types-list.interface';


@Injectable()
export class TypeEffects {
  constructor(private actions$: Actions, public typeService: TypeService) {}

  // listens for GET_TYPES_REQUEST action and triggers typeService.query()
  @Effect() 
  getTypes$ = this.actions$.pipe(

    ofType(TypeActions.GET_TYPES_REQUEST),

    switchMap((action: TypeActions.GetTypes) =>
      this.typeService.query().pipe(
        map((data: TypeQuery) => new TypeActions.GetTypesSuccess(data)),
        catchError((err: TypeError) => of(new TypeActions.GetTypesFailure(err)))
        )
      )
    );

}
