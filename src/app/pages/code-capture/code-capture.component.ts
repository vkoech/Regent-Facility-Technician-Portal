import { Component, OnInit, Renderer2 } from '@angular/core';
import { CodeCaptureService } from 'app/shared/services/code-capture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-code-capture',
  templateUrl: './code-capture.component.html',
  styleUrls: ['./code-capture.component.css']
})
export class CodeCaptureComponent implements OnInit {
  disabled: boolean;

  constructor(private renderer: Renderer2, public serviceCodeCapture: CodeCaptureService, private toastr: ToastrService) { }

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
  get f() {  return this.serviceCodeCapture.formModel?.controls; }

  onSubmit() {
    this.serviceCodeCapture.resetPassword().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.serviceCodeCapture.formModel.reset();
          grecaptcha.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Successfully send.. Check Your Mail');
        } else {
          this.toastr.error( 'Failed');
        }
        // alert(res.responseDescription);
      },
      err => {
        this.toastr.error(err, 'Error!');
        // console.log(err);
      }
    );
  }

}
