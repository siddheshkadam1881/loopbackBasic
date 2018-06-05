import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  fbLogin() {
     this.userService.fbLogin().then(() => {

                                  //    this.showSuccess();
                                  //    setTimeout (() => {
                                  //    this.router.navigate(['/home']);
                                  // }, 2000)
                                });




}
}
