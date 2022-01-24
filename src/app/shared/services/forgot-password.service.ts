import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  readonly baseUrl ='https://regent.angazake.com/facility-moduleapi/api/maintenance/';

  formModel = this.fb.group({
    TechnicianNo: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  forgotPassword() {
    const body = {
      TechnicianNo: this.formModel.value.TechnicianNo,
    };
    return this.http.post(this.baseUrl + '/sendTechnicianPasswordresetLink', body);
  }
}
