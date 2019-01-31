import { Injectable } from '@angular/core'

import { UserObject } from '@models/users/user.interface'
import { UserModel } from '@models/users/user.model'
import { Api } from '@providers/api/api.service'

import { timer } from 'rxjs/observable/timer';


@Injectable()
export class UserService {

  constructor(public api: Api) {}

  get() {
    return this.api.get<UserObject>('rest-auth/user')
  }

  patch(user: UserModel, fields: string[]) {
    return this.api.patch<UserObject>('rest-auth/user', user.getPatchPayload(fields))
  }

  delete(user: UserModel) {
    return timer(1000)
  }

}
