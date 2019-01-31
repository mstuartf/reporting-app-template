import { Injectable } from '@angular/core'

import { TypeQuery } from '@models/types/type.interface'
import { Api } from '@providers/api/api.service'


@Injectable()
export class TypeService {

  endpoint: string = 'issue_types'

  constructor(public api: Api) { }

  // fetch all types
  query() {
    return this.api.get<TypeQuery>(this.endpoint)
  }

}
