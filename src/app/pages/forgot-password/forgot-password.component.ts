import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'app/shared/services/forgot-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private renderer: Renderer2, public serviceForgotPassword: ForgotPasswordService, private toastr: ToastrService, private router: Router) { }
  disabled = true;
  loading = false;

  private formSubmitAttempt: boolean;

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.serviceForgotPassword.forgotPassword().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.serviceForgotPassword.formModel.reset();
          this.toastr.success(res.responseDescription, 'Successfully send.. Check Your Mail');
          this.router.navigate(['login']);

        } else {
          this.toastr.error(res.responseDescription, 'Check technician number');
          // this.toastr.error( 'Failed');
          this.loading = false;
        }
      },
      err => {
        this.toastr.error(err, 'Error!');
        this.loading = false;

      }
    );
  }

  get f() {  return this.serviceForgotPassword.formModel?.controls; }

}
