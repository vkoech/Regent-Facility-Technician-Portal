import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

import * as forge from 'node-forge'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/maintenance/loginTechnician' ;

  publicKey: string =`-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfm2uMTvb+gqXRFxWHnfCKcHfH
  v7aMN6oiEqTJj0BixtTYBXH89N+xuYgoIBnfMXPXPIg/UNWEOZtAETsOVvya+YBo
  ZZTquYJ2I0PaxtpUKkpCiEQ/bTCQIDAeUwHr0l4vUn/fmslD0rZ3+jo4Dsl8nX0O
  pwZQ2grQaXLb347RQwIDAQAB
  -----END PUBLIC KEY-----`;

  formModel = this.fb.group({
      TechnicianNo: ['', Validators.required],
      Password: ['', Validators.required],
    }
  );


  constructor(private fb: FormBuilder, private http: HttpClient) {}

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

// tslint:disable-next-line:typedef
  login() {
    const body = {
      TechnicianNo:this.encryptWithPublicKey(this.formModel.value.TechnicianNo) ,
      Password: this.encryptWithPublicKey(this.formModel.value.Password),
    };
    return this.http.post(this.baseUrl, body);
  }
}
