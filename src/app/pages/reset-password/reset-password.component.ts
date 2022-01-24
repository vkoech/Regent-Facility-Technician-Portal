import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from 'app/shared/services/reset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  disabled = true;
  TechnicianNo: string;
  constructor(public resetForgotPassword: ResetService,private toastr: ToastrService, private renderer: Renderer2, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.TechnicianNo = params.TechnicianNo;
      console.log(this.TechnicianNo); // price
    }
  );
  }

  onSubmit() {
    this.resetForgotPassword.updatePassword().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.resetForgotPassword.formModel.reset();
          this.toastr.success(res.responseDescription, 'Password Changed Successful');
          this.router.navigate(['login']);
        } else {
          this.toastr.error( res.responseDescription, 'Check Error!');
        }
      },
      err => {
        console.log(err);
        this.toastr.error(err, 'Error!');
      }
    );
  }
  get f() {  return this.resetForgotPassword.formModel?.controls; }

}
