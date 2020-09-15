import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler) {
    let loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    if (loginResponse) {
      let modifiedRequest = req.clone({setHeaders: {
        authorization: 'Bearer ' + loginResponse.token
      }});
      return handler.handle(modifiedRequest);
    } else {
      return handler.handle(req);
    }
  }
}
