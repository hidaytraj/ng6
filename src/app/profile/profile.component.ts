import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser;
  profile;
  isLoading: boolean = false;
  currentGender: string = "";
  constructor(private globalService:GlobalService, private router:Router) {
    
    this.checkSession();
    // Get User Profile
    this.isLoading = true;
    globalService.getUserProfile().subscribe(
      res => {
        var res = res.profile;
        this.dpGenderCheck(res.gender);
          this.currentUser = res.email;
          this.profile = res;         
          //console.log(res);
          this.isLoading = false;
      },
      err => console.error("Http Error :"+err),
      () => console.log("Profile Call Completed")
    )
   }

   // Check DP for Male/Female
   private dpGenderCheck(gender){
     this.currentGender = "";
      if(gender=="female"){
        this.currentGender =  "default-dp-female.jpg";
      }else {
        this.currentGender =  "default-dp-male.jpg";
      }
      return this.currentGender;
   }

   // Log Out
   public logOut (){
    sessionStorage.removeItem("access_token");
    this.router.navigateByUrl('/login');
   }

   // Session Handler
   public checkSession(){
    var currentAccToken = sessionStorage.getItem("access_token");
    if(currentAccToken==null){
      this.router.navigateByUrl('/login');
    }
    
   }

  ngOnInit() {
  }

}
