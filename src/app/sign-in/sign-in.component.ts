import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_auth/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoginError = false;
  userClaims: any;
  syncing = false;
  btnText = 'Login';
  btnReset = 'Reset Password';
  userEmail: string;
  tempEmail: any[] = [];
  closeResult: string;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(
    private userService: UserService, private router: Router,
    private breakpointObserver: BreakpointObserver,
    private toastr: ToastrService,
    public globals: Globals,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {

  }

  OnSubmit(userName, password) {
    /** spinner starts on init */
    this.btnText = 'Processing';



    this.syncing = true;
    this.spinner.show();
    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('userCode', userName);
          this.globals.userCode = userName;
          this.syncing = false;
          this.userService.setUser();
          this.spinner.hide();
          this.btnText = 'Login';
          this.router.navigate(['/menu']);
        },
        (err: HttpErrorResponse) => {
          console.log('Authentication Error', err);
          this.isLoginError = true;
          this.syncing = false;
          this.spinner.hide();
        });

  }

  resetEmail(email) {
    /** spinner starts on init */
    this.btnReset = 'Processing your request';
    this.spinner.show();
    this.tempEmail.push({
      email: this.userEmail
    });
    this.userService.forgotPassword(this.tempEmail[0]).subscribe(
      (data: any) => {
        console.log(data);
        this.spinner.hide();
        this.toastr.success('An email has been sent to your inbox.');
        this.btnText = 'Success';
        this.authenticationService.logout();
        this.router.navigate(['/menu']);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('The email could not be found in the system.');
        this.btnReset = 'Reset Password';
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  openForm(content) {
    this.userEmail = '';
    this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
            if (this.closeResult === 'Closed with: Save click') {
              this.resetEmail(this.userEmail);
            }
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

