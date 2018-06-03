import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  localDomain: string = "";
  rootDomain: string = "http://clickimagine.com/api/";
  loginUrl = this.rootDomain + "login";
  loginCred;
  localProfile = "./assets/data/profile.mock.json";

  constructor(private httpClient: HttpClient) { }

  // Login Check
  postLogin(uname, pwd): Observable<any> {
    this.loginCred = uname + ":" + pwd;
    const credntToken = btoa(this.loginCred);
    const body = new HttpParams()
      .set('location', 'india')
      .set('time', '08');
    return this.httpClient.post(this.loginUrl,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Basic ' + credntToken)
      })
  }


}