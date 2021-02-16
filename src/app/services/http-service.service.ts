import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from  '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public http: Http) { }

  private responseData(res: Response) {
    let body = {};
    try {
      body = res.json();
      return body;
    }catch(e) {
      return body;
    }
  }
  public post(url: string, body: any) {
    let header = new Headers({"Content-Type": "multipart/form-data"});
    let options = new RequestOptions({headers: header});
    return this.http.post(url, body, options).pipe(map(res => res.json()));
  }
}
