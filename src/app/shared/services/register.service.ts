import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  readonly baseUrl = 'http://173.249.23.236/pbc-studentapi/api/student/' ;

  formModel = this.fb.group({
      StudentNo: ['', Validators.required],
      Password: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) {}


// tslint:disable-next-line:typedef
  register() {
    const body = {
      StudentNo: this.formModel.value.StudentNo,
      Password: this.formModel.value.Password,
    };
    return this.http.post(this.baseUrl + '/login', body);
  }
}
