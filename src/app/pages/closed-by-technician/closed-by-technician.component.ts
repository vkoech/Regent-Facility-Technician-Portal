import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {ClosedByTechnicianTicketsService} from '../../shared/services/closedByTechnicianTickets.service';

@Component({
  selector: 'app-closed-by-technician',
  templateUrl: './closed-by-technician.component.html',
  styleUrls: ['./closed-by-technician.component.css']
})
export class ClosedByTechnicianComponent implements OnInit {
   public TechnicianNo: string

   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject<any>();
  constructor( public closedByTechService: ClosedByTechnicianTicketsService) { }

  ngOnInit(): void {
    this.TechnicianNo = localStorage.getItem('techNo');
    this.closedByTechService.getClosedTechByTenantNo(this.TechnicianNo);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 0,
      // lengthMenu : [5, 10, 25],
      processing: true,
      searching: false,
    };
    // this.dtTrigger.next();
  }

}
