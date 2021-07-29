import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ClosedModel} from '../models/closed.model';

@Injectable({
  providedIn: 'root'
})
export class ClosedTicketsService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/' ;
  closedTickets: ClosedModel[];

  constructor( private http: HttpClient) {}



  getClosedTicketByTenantNo(TechnicianNo) {
    // tslint:disable-next-line:max-line-length
    this.http.get<ClosedModel[]>(this.baseUrl + '/maintenance/getClosedTickets?technicianNo=' + TechnicianNo).subscribe(
      data => {
        this.closedTickets = data;
        console.log(this.closedTickets)
      }
    );
  }
}
