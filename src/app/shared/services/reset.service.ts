import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'app/pages/code-capture/confirmed.validators';


@Injectable({
  providedIn: 'root'
})
export class ResetService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/maintenance/';

  formModel = this.fb.group({
      Password: ['', [Validators.required, Validators.pattern('(?=.*[$@$!%*?&#<>{})(?=.*[0-9])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}')]],
      ConfirmPassword: [''],
    },
    {
      validator: ConfirmedValidator('Password', 'ConfirmPassword')      }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  updatePassword() {
    const body = {
      Password: this.formModel.value.Password,
    };
    return this.http.post(this.baseUrl + '/resetTechnicianPassword', body);
  }
}
