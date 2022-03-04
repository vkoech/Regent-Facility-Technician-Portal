import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'app/pages/code-capture/confirmed.validators';
import { RsaService } from './rsa.service';


@Injectable({
  providedIn: 'root'
})
export class ResetService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/maintenance/';

  formModel = this.fb.group({
      TechnicianNo: [''],
      Password: ['', [Validators.required, Validators.pattern('(?=.*[$@$!%*?&#<>{})(?=.*[0-9])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}')]],
      ConfirmPassword: [''],
    },
    {
      validator: ConfirmedValidator('Password', 'ConfirmPassword')      }
  );

  constructor(private fb: FormBuilder, private http: HttpClient, private rsa_encryption: RsaService) { }
  // tslint:disable-next-line:typedef
  updatePassword() {
    const body = {
      Password: this.rsa_encryption.encryptWithPublicKey( this.formModel.value.Password),
      TechnicianNo: this.rsa_encryption.encryptWithPublicKey( this.formModel.value.TechnicianNo),
    };
    return this.http.post(this.baseUrl + '/resetTechnicianPassword', body);
  }
}
