import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/maintenance/loginTechnician' ;

  formModel = this.fb.group({
      TechnicianNo: ['', Validators.required],
      Password: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) {}


// tslint:disable-next-line:typedef
  login() {
    const body = {
      TechnicianNo: this.formModel.value.TechnicianNo,
      Password: this.formModel.value.Password
    };

  //  console.log(this.formModel);
    return this.http.post(this.baseUrl, body);
    //console.log(this.formModel);
  }
}
