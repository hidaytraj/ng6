import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateProfileService } from '../services/updateProfile.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currentUserData:any;
  isLoading: boolean = false;
  // Form Group
  editForm = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    designation: new FormControl(),
    mobile: new FormControl(),
    about: new FormControl()
    //gender: new FormControl()
  })
  constructor(private router: Router,private fb: FormBuilder, private profileService: ProfileService, private updateProfileService: UpdateProfileService) {
    
    this.isLoading = true;

    // Get User Profile
    profileService.getUserProfile().subscribe(
      res => {
        var res = res.profile;
        this.currentUserData = res;
        console.log(this.currentUserData.email);
        this.createForm();
        this.isLoading = false;
      },
      err => console.error("Http Error :" + err),
      () => console.log("User Profile from Edit profile Call Completed")
    );

    
  }

  // Create Form and Filled data dynamically from API
  createForm() {
    let user = this.currentUserData;
    this.editForm = this.fb.group({
      fname: [user.fname, Validators.required],
      lname: [user.lname, Validators.required],
      email: [user.email, Validators.required],
      mobile: [user.mobile, Validators.required],
      about: [user.about, Validators.required],
     // gender: ['mal'],
      designation: [user.designation, Validators.required]  
    })
  }

  // Update user
  doUpdate(fieldsValues){
    this.isLoading = true;
    this.updateProfileService.updateUserProfile(fieldsValues).subscribe(
      res => {
        var res = res.profile;
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
      },
      err => console.error("Http Error :" + err),
      () => console.log("Update Profile Call Completed")
    );
  }

  ngOnInit() {
   
  }

}
