import { Component, OnInit, Renderer2 } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import { ResetService } from 'app/shared/services/reset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  disabled = true;
  TechnicianNo: string;
  loading = false;




  constructor(public resetForgotPassword: ResetService,private toastr: ToastrService, private renderer: Renderer2, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const Script = this.renderer.createElement('Script');
    Script.defer = true;
    Script.async = true;
    Script.src = 'https://www.google.com/recaptcha/api.js';
    this.renderer.appendChild(document.body, Script);
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.TechnicianNo = params.TechnicianNo;
      console.log(this.TechnicianNo);
    }
  );}

  resolved(token: any) {
    this.disabled = false;
  }

  onSubmit() {
    this.loading = true;
    this.resetForgotPassword.updatePassword().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.resetForgotPassword.formModel.reset();
          // reset recapture after success
          // grecaptcha.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Password Changed Successful');
          this.router.navigate(['login']);
        } else {
          this.loading = false;
          this.toastr.error( res.responseDescription, 'Check Error!');
        }
        // alert(res.responseDescription);
      },
      err => {
        this.disabled=false;
        console.log(err);
        this.toastr.error(err, 'Error!');
      }
    );
  }
  get f() {  return this.resetForgotPassword.formModel?.controls; }

}
