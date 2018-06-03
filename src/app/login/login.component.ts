import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputUsername = "";
  inputPassword = "";
  showLoader: boolean = false;
  errorStatus: boolean = false;
  errorMessage: string;
  isUserValid: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
  }
  // Login Call
  private doLogin(uname, pwd) {
    this.showLoader = true;
    this.loginService.postLogin(uname, pwd).subscribe(
      res => {
        this.showLoader = false;
        // If username/passwprd is worng
        if (res.status == 0) {
          this.errorStatus = true;
          this.errorMessage = res.message;
        } else {
          this.errorStatus = false;
          let ac_token = res.access_token;
          sessionStorage.setItem("access_token", ac_token);
          console.log(ac_token);
          this.router.navigateByUrl('/dashboard');
        }
        
       
      },
      err => console.error("Error : " + err)
    )

   
  }


  ngOnInit() {
  }

}
