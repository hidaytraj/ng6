import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UpdateProfileService {
    localProfile = "./assets/data/profile.mock.json";
    rootDomain: string = "http://clickimagine.com/api/";
    urlUpdateProfile: string = this.rootDomain + "updateProfile";
    updated: any;
    skills;
    constructor(private httpClient: HttpClient) {
        this.updated = [
            {
                title: "Facebook",
                url: "https://www.facebook.com/hidaytrahman"
            },
            {
                title: "Twitter",
                url: "https://twitter.com/hidaytrahman"
            },
            {
                title: "GitHub",
                url: "https://github.com/hidaytrahman"
            }
        ]


        this.skills = ["HTML","CSS"];

    }

    // Update User Profile Service
    updateUserProfile(fieldsVal): Observable<any> {
        console.log("wah "+fieldsVal.fname);
        let acc_token = sessionStorage.access_token;
        const body = new HttpParams()
        .set('fname', fieldsVal.fname)
        .set('lname', fieldsVal.lname)
        .set('email', fieldsVal.email)
        .set('designation', fieldsVal.designation)
        .set('about', fieldsVal.about)
        .set('skills', this.skills)
        .set('mobile', fieldsVal.mobile)
        .set('social_profiles', JSON.stringify(this.updated));
        // If token exist
        if (acc_token != null) {
          return this.httpClient.post(this.urlUpdateProfile,
            body.toString(),
            {
              headers: new HttpHeaders() 
                .set('Authorization', 'Bearer ' + acc_token)
                .set("Content-type", "application/x-www-form-urlencoded")
            })
        }
    
      }
}