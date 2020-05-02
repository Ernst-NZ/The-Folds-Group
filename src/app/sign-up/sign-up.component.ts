import { Component, OnInit } from '@angular/core';
import { User } from '../_shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../_shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SatsService } from '../_shared/sats.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isRegisterError = false;
  user: User;
  errors: any;
  btnText = 'Submit';
  private service: SatsService;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    service: SatsService,
    public globals: Globals,
    private router: Router,
  ) {
    this.service = service;
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      UserName: '',
      Password: '',
      ConfirmPassword: '',
      Email: '',
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      CompanyCode: '',
      RoleCode: ''
    };
  }

  OnSubmit(form: NgForm) {
    if (!form.value.Email) {
      this.toastr.error('Please enter an Email address');
      return;
    }
    if (!form.value.UserName) {
      this.toastr.error('Please enter user Name');
      return;
    }
    this.btnText = 'Processing';
    this.spinner.show();
    this.userService.registerNewUser(form.value).subscribe(
      (data: any) => {
        console.log(1);
        if (data.Succeeded === true) {
         // this.resetForm(form);
          this.spinner.hide();
          alert('User registration successful');
          this.toastr.success('User registration successful');
          this.btnText = 'Submit';
        } else {
           this.errors = data.Errors;
           this.toastr.error('Oops, Looks like something went wrong: ' && data.Errors);
           console.log(this.errors);
           this.btnText = 'Submit';
           this.spinner.hide();
        }
      },
      error => {
        console.log('error!!!!!');
        this.errors = error.error.Message;
        this.toastr.error('Oops, Looks like something went wrong: ' && this.errors);
        console.log(error);
        this.btnText = 'Submit';
        this.spinner.hide();
      }
    );
  }
}
