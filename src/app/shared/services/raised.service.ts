import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {RaisedTicketsModel} from '../models/raisedTickets.model';

@Injectable({
  providedIn: 'root'
})
export class RaisedService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/' ;
  raisedTickets: RaisedTicketsModel[];

  constructor( private http: HttpClient) {}



  getRaisedTicketByTenantNo(TenantNo: string) {
    // tslint:disable-next-line:max-line-length
    this.http.get<RaisedTicketsModel[]>(this.baseUrl + '/maintenance/getOpenTickets?tenantNo=' + TenantNo).subscribe(
      data => {
        this.raisedTickets = data;
        console.log(this.raisedTickets)
      }
    );
  }
}
