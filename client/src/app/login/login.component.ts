import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login'
import { UserService } from '../services/user.service';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //password validation
  hide = true;
  //declare object of FormControl for email validator
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService,private commonService:RestbackendApiService) { }

  ngOnInit() {
  }

  /** validation of chech here... ***/
  getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value like john@abc.com' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
  }

  signInUser(data)
      {
        localStorage.setItem('email',data.email);
        this.commonService.postServiceData('signin',data)
                                             .subscribe(data => {
                                              localStorage.setItem('token',data.token);
                                              this.subscription=  this.commonService.getprofile()
                                                                                     .subscribe(response => {
                                                                                         if (response)
                                                                                          {

                                                                                               this.router.navigate(['/home']);
                                                                                             }
                                                   })



                                                   });
     }



}
