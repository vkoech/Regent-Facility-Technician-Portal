import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ClosedByTechModel} from '../models/closedByTech.model';
import {FormBuilder, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClosedByTechnicianTicketsService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/' ;
  closedByTech: ClosedByTechModel[];
  constructor( private http: HttpClient) {}

  getClosedTechByTenantNo(TechnicianNo) {
    // tslint:disable-next-line:max-line-length
    this.http.get<ClosedByTechModel[]>(this.baseUrl + '/maintenance/getTicketsClosedByTechnician?technicianNo=' + TechnicianNo).subscribe(
      data => {
        this.closedByTech = data;
        // console.log(this.closedByTech)
      }
    );
  }
}
