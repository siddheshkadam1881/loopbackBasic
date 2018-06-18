import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { ElementRef, Input, OnDestroy} from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http'
//import { BackendApiService } from '../services/backend-api.service';
import { ViewContainerRef} from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

  myForm1: FormGroup;
  //roleArray = ['User', 'Admin'];
  selected: string;
  filter: any;
  role:any;
  currentItem:any;
  responseStatus:Object = [];
  status: boolean ;
  private subscription: ISubscription;
  //validation of full name
  options: FormGroup;

  //password validation
  hide = true;
  //declare object of FormControl for email validator
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(fb: FormBuilder ,private route: ActivatedRoute, private router: Router )
   {
     //this.toastr.setRootViewContainerRef(vcr);
     this.options = fb.group
     ({
       hideRequired: false,
       floatLabel: 'auto',
     });
   }
  getErrorMessage() {
   return this.email.hasError('required') ? ' You must enter a value like john@abc.com' :
   this.email.hasError('email') ? 'Not a valid email' :
           '';
  }

}
