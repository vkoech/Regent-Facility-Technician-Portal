import { Component, OnInit } from '@angular/core';
import {ClosedByTechnicianTicketsService} from '../../shared/services/closedByTechnicianTickets.service';

@Component({
  selector: 'app-closed-by-technician',
  templateUrl: './closed-by-technician.component.html',
  styleUrls: ['./closed-by-technician.component.css']
})
export class ClosedByTechnicianComponent implements OnInit {
   public TechnicianNo: string
  constructor( public closedByTechService: ClosedByTechnicianTicketsService) { }

  ngOnInit(): void {
    this.TechnicianNo = localStorage.getItem('techNo');
    this.closedByTechService.getClosedTechByTenantNo(this.TechnicianNo);
  }

}
