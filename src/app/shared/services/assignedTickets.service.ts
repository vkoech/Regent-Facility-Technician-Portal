import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {FormBuilder, Validators} from '@angular/forms';
import {AssignedTicketsModel} from '../models/assignedTickets.model';

@Injectable({
  providedIn: 'root'
})
export class AssignedTicketsService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/maintenance/' ;
  assignedTickets: AssignedTicketsModel[];
  assignedTicketsById: AssignedTicketsModel[];


  formModel = this.fb.group({
      No: ['', Validators.required],
      TechnicianComments: ['', Validators.required],
    }
  );
  constructor( private http: HttpClient, private fb: FormBuilder) {}

  addComments() {
    const body = {
      No: this.formModel.value.No,
      TechnicianComments: this.formModel.value.TechnicianComments,
    };
    return this.http.post(this.baseUrl + '/postTechnicianComments', body);
  }
  getAssignedByTenantNo(TechnicianNo: string) {
    // tslint:disable-next-line:max-line-length
    this.http.get<AssignedTicketsModel[]>(this.baseUrl + '/getAssignedTickets?technicianNo=' + TechnicianNo).subscribe(
      data => {
        this.assignedTickets = data;
        // console.log(this.assignedTickets)
      }
    );
  }
  getAssignedTicketsById(TicketNo: string) {
    // tslint:disable-next-line:max-line-length
    this.http.get<AssignedTicketsModel[]>(this.baseUrl + '/GetOpenServiceRequest?ticketNo=' + TicketNo).subscribe(
      data => {
        this.assignedTicketsById = data;
        // console.log(this.assignedTickets)
      }
    );
  }
}
