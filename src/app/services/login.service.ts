import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  //"http://sushma.vacwebs.com/api/login";
  localDomain:string = "";
  rootDomain:string = "http://clickimagine.com/api/";
  loginUrl = this.rootDomain+"login";
  loginCred;

  constructor(private httpClient: HttpClient) { }

  postLogin(uname,pwd): Observable<any> {
    // this.loginCred = "sushma:12345"
    this.loginCred = uname+":"+pwd;
    const credntToken = btoa(this.loginCred);
    const body = new HttpParams()
      .set('username', 'hidayt')
      .set('password', 'apnahai');
    return this.httpClient.post(this.loginUrl,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Basic ' + credntToken)
      })
  }


}