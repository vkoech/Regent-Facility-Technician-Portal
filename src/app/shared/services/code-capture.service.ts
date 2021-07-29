import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CodeCaptureService {

  readonly baseUrl = 'http://173.249.23.236/pcb-studentapi/api/application';


  formModel = this.fb.group({
    StudentNo: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  resetPassword() {
    const body = {
      StudentNo: this.formModel.value.StudentNo,
    };
    return this.http.post(this.baseUrl + '/sendpasswordresetLink', body);
  }
}
