import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import { AuthServiceService } from 'app/shared/services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  disabled = true;

  constructor(private toastr: ToastrService, public serviceLogin: LoginService, private authService: AuthServiceService, private router: Router,
              private SpinnerService: NgxSpinnerService, private renderer: Renderer2,) { }


  ngOnInit(): void {
    const Script = this.renderer.createElement('Script');
    Script.defer = true;
    Script.async = true;
    Script.src = 'https://www.google.com/recaptcha/api.js';
    this.renderer.appendChild(document.body, Script);

  }
  resolved(token: any) {
    this.disabled = false;
  }

  get f() {  return this.serviceLogin.formModel?.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.loading = true;
    localStorage.setItem('techNo',this.serviceLogin.formModel.value.TechnicianNo);
    this.serviceLogin.login().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.serviceLogin.formModel.reset();
          localStorage.setItem('techNo', res.Id);
          this.toastr.success(res.responseDescription, 'Login Successful');
          this.SpinnerService.hide();
          this.router.navigate(['assignedTickets']);
        } else {
          this.toastr.error( res.responseDescription, 'Login Failed!!!');
          this.loading = false;
          grecaptcha.reset();
        }
        // alert(res.responseDescription);
      },
      err => {
         this.loading = false;
         grecaptcha.reset();
        this.toastr.error(err, 'Error!');
      }
    );
  }

}
