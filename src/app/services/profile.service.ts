import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    localProfile = "./assets/data/profile.mock.json";
    rootDomain: string = "http://clickimagine.com/api/";
    urlProfile: string = this.rootDomain + "profile";   
    constructor(private httpClient: HttpClient) {
        
    }

    // Get User Profile
    getUserProfile(): Observable<any> {
        let acc_token = sessionStorage.access_token;
        // If token exist
        if (acc_token != null) {
            return this.httpClient.get(this.urlProfile,
                {
                    headers: new HttpHeaders()
                        .set('Authorization', 'Bearer ' + acc_token)
                })
        }

    }
}