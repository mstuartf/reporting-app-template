import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/delay'

import { UserObject } from '@models/users/user.interface'
import { UserModel } from '@models/users/user.model'
import { AppState } from '@app/app.state'


// type the requestOptions to make sure HttpClient uses the right methods
// (see https://stackoverflow.com/a/48405006)
interface requestOptions {
  headers?: HttpHeaders | {[header: string]: string | string[]},
  observe?: 'body',
  params?: HttpParams | {[param: string]: string | string[]},
  reportProgress?: boolean,
  responseType?: 'json',
  withCredentials?: boolean,
}

@Injectable()
export class Api {

  url: string = 'http://35.178.213.41/api/v1'

  onDestroy$ = new Subject()
  user: UserModel
  delay: number

  constructor(public http: HttpClient, private store: Store<AppState>) {

    // subscribe to the user store
    this.store.select('user').takeUntil(this.onDestroy$).subscribe((user: UserObject) => {
      this.user = new UserModel(user)
      this.delay = this.user.slowMode ? 2000 : 0
    });

  }

  get<T>(endpoint: string, params?: object, reqOpts?: requestOptions): Observable<T> {

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams()
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k])
      }
    }

    return this.http.get<T>(this.url + '/' + endpoint + '/', reqOpts).delay(this.delay)
    
  }

  post<T>(endpoint: string, body: any, reqOpts?: requestOptions): Observable<T> {
    return this.http.post<T>(this.url + '/' + endpoint + '/', body, reqOpts).delay(this.delay)
  }

  put<T>(endpoint: string, body: any, reqOpts?: requestOptions): Observable<T> {
    return this.http.put<T>(this.url + '/' + endpoint + '/', body, reqOpts).delay(this.delay)
  }

  delete<T>(endpoint: string, reqOpts?: requestOptions): Observable<T> {
    return this.http.delete<T>(this.url + '/' + endpoint + '/', reqOpts).delay(this.delay)
  }

  patch<T>(endpoint: string, body: any, reqOpts?: requestOptions): Observable<T> {
    return this.http.patch<T>(this.url + '/' + endpoint + '/', body, reqOpts).delay(this.delay)
  }

  ngOnDestroy () {
    this.onDestroy$.next()
  }

}
