import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { App } from 'ionic-angular'
import { Observable } from 'rxjs'

import { AuthService } from '@providers/auth/auth.service'
import { AuthObject } from '@models/auth/auth.interface';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(public app: App, public authService: AuthService) {}

	// taken from https://stackoverflow.com/a/51272464
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const tokenObservable = this.authService.getToken().map((auth: AuthObject) => {

			if (!auth) return request;  // todo: may need to exclude certain URLs from this

			return request = request.clone({
				setHeaders: {
					Authorization: `Token ${auth.key}`
				}
			})

		})

		return tokenObservable.flatMap((req) => {
			return next.handle(req).do(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						// do stuff to the response here
					}
				}, 
				(err: any) => {			
					if (err.status === 401) {
						// if they have a token but it is invalid, redirect to splash
						this.authService.removeToken().map(() => {
							this.app.getRootNavs()[0].setRoot('SplashPage')
						})
					}
				})
		})

	}

}
